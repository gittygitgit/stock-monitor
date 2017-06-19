"use strict";
import EventEmitter from 'events';
//import {assign} from 'object-assign';
var assign = require('object-assign');
import ActionTypes from '../actions/ActionTypes';
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher'
import Immutable, {Map, List, fromJS} from 'immutable';
import FirmApi from '../api/FirmApi'
import FirmDetail from '../api/FirmDetail'
import SortDir from '../components/SortDir'
const moment = require('moment');

/**
  * State:
  * groupMap               - Map of firms, portFirmId => PortFirm
  * groupPortMap           - Map of firm details, firm => firmDetail
  * portsForSelectedGroup  - Map of port to port totals for a selected firm, port => ???
  * groupSummaryInfo       - Map of summary info across firms
  * selectedGroup          - Group selected
  * groupSortInfo          - single property value, key is colName, value is asc/desc
  * portSortInfo           - single property value, key is colName, value is asc/desc
  */
class FirmStore extends ReduceStore {
  constructor() {
//    console.log("FirmStore::ctor");
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.fromJS({
      groupMap: Map(),
      portsForSelectedGroup: Map(),
      groupPortMap: Map(),
      groupSortInfo: {last:SortDir.ASC},
      portSortInfo: {last:SortDir.ASC},
      groupSummaryInfo: Map()
        .set("last", "00:00:00.000")
        .set("totQuotes", 0)
        .set("totBlocks", 0)
        .set("totPurges", 0)
        .set("totUndPurges", 0),
      selectedGroup: '',
    })
  }
 
  reduce(state, action) {
 //   console.log("FirmStore::reduce");
   switch (action.type) {
      case ActionTypes.INITIALIZE:
        console.log("INITIALIZE");
        // Get all portFirms
        // portFirm id => PortFirm
        let idToFirmPortMap = Map();
        // firmname => FirmDetail
        let firmToFirmTotalsMap = Map();
        // firmname => FirmDetail
        let firmToPortTotalsMap = Map();


        let portMap;
  
        // TODO: Replace w/ callback off a core Websocket connection
        FirmApi.spinPortFirms().forEach(port => { 
          let firmName = port.get("name");
          idToFirmPortMap = idToFirmPortMap.set(port.get("id"), port);
          let detail = null;
          if (!firmToFirmTotalsMap.has(firmName)) {
            detail = fromJS({
              last:         '00:00:00.000',
              firm:         firmName,
              port:         port.get("port"),
              ring:         port.get("ring"),
              numBlocks:    0, 
              rateCurrent:  0, 
              rate1Min:     0, 
              rate5Min:     0, 
              qlCurrent:    0, 
              ql1Min:       0, 
              limitCurrent: 0, 
              limit1Min:    0, 
              limit5Min:    0, 
              quotes:       0, 
              blocks:       0, 
              purges:       0, 
              undPurges:    0});

            firmToFirmTotalsMap = firmToFirmTotalsMap.set(
              firmName, detail
            );
          } 
          
          portMap = firmToPortTotalsMap.get(firmName);
          if (portMap === undefined) {
            portMap = Map();
          }
          portMap = portMap.set(
            port.get("port"), fromJS(
              {
	        last:         '00:00:00.000',
		firm:         firmName,
		port:         port.get("port"),
		ring:         port.get("ring"),
		numBlocks:    0, 
		rateCurrent:  0, 
		rate1Min:     0, 
		rate5Min:     0, 
		qlCurrent:    0, 
		ql1Min:       0, 
		limitCurrent: 0, 
		limit1Min:    0, 
		limit5Min:    0, 
		quotes:       0, 
		blocks:       0, 
		purges:       0, 
		undPurges:    0,
                changed:      false,
              }
            )
          );
   
          firmToPortTotalsMap = firmToPortTotalsMap.set(
            firmName,
            portMap
          ) 
        });

        return state.mergeDeep(
          fromJS({
            "groupMap":       firmToFirmTotalsMap,
            "groupPortMap": firmToPortTotalsMap,
          })
        );
      case ActionTypes.ON_PORT_UPDATE:
//        console.log("ON_PORT_UPDATE");
        
        // reset changed flag
        let curFirms  = state.get("groupMap");
        curFirms = curFirms.map( f => f.set("changed", false));

        let event = action.firm;
        let firmName = event.firm;
       
        let eventMap = Map(event); 
	let entry = Map().set(firmName, eventMap);

        let nextFirms = curFirms.mergeDeep(
          entry
        );
        
        if (!curFirms.equals(nextFirms)) {
//          console.log("state changed"); 
            nextFirms = nextFirms.set(event.firm, nextFirms.get(event.firm).set("changed", true));
        }

        // GROUP => PORTS 
        let curGroupPortMap = state.get("groupPortMap");
        console.log("asdfas");     
        console.log(curGroupPortMap);
        let curPortsForFirm = curGroupPortMap.get(firmName);

        console.log(curPortsForFirm); 
        entry = Map().set(           
          event.port, 
	  eventMap.set("changed", false)
        );

        debugger;

        let nextPortsForFirm = curPortsForFirm.mergeDeep(
          entry
        );

        let nextGroupPortMap = curGroupPortMap.mergeDeep(
          Map().set(
            firmName,
            nextPortsForFirm
          )
        );
        
      
         
        let showingPortMap = state.get("selectedGroup");
 
        if (showingPortMap) {
          // user has a firm selected
          let selectedGroup = state.get("selectedGroup");

          // update ports if user is viewing same group just updated
          if (selectedGroup == firmName) {
	    // update his ports w/ global cache
	    state = state.set("portsForSelectedGroup", nextGroupPortMap.get(selectedGroup));
          }
        }

        let groupSummaryInfo = state.get("groupSummaryInfo");

        let totQuotes = parseInt(groupSummaryInfo.get("totQuotes")) + event.quotes;
        let totBlocks = parseInt(groupSummaryInfo.get("totBlocks")) + event.blocks;
        let totPurges = parseInt(groupSummaryInfo.get("totPurges")) + event.purges;
        let totUndPurges= parseInt(groupSummaryInfo.get("totUndPurges")) + event.undPurges;

        state = state.set("groupSummaryInfo", Map()
              .set("last", event.last)
              .set("totQuotes", totQuotes)
              .set("totBlocks", totBlocks)
              .set("totPurges", totPurges)
              .set("totUndPurges", totUndPurges)
        );

        return state.mergeDeep(
          fromJS({
            "groupMap":nextFirms,
            "groupPortMap": nextGroupPortMap,
          })
        );
      case ActionTypes.SORT_GROUPS:
        console.log("FirmStore::reduce [actionType=SORT_GROUPS]");
        console.log("sortCol=%s, sortDir=%s", action.sortCol, action.sortDir);
        console.log(state);
        let sorted=action.rows;
        console.log(sorted);
        let sortCol = action.sortCol;
        let sortDir = action.sortDir;
        return state.set("groupMap", sorted).set("groupSortInfo", Map({ [sortCol]:sortDir }));
      case ActionTypes.SORT_PORTS:
        console.log("FirmStore::reduce [actionType=SORT_PORTS]");
        console.log("sortCol=%s, sortDir=%s", action.sortCol, action.sortDir);
        console.log(state);

        if (!state.get("selectedGroup")) {
          console.error("No group selected");
          return;
        }
       
        selectedGroup = state.get("selectedGroup");
        console.log(selectedGroup); 
        portMap = state.get("groupPortMap").get(selectedGroup);

        ({sortCol, sortDir} = action);
        portMap = this._onSortChange(portMap, sortCol, sortDir);

        state = state.setIn(["groupPortMap", selectedGroup], portMap)
        return state.set("portsForSelectedGroup", portMap).set("portSortInfo", Map({ [sortCol]:sortDir }));
      case ActionTypes.ON_SELECT_GROUP:
        console.log("FirmStore::reduce [actionType=ON_SELECT_GROUP]");
	let sequencedGroups = state.get("groupMap").keySeq();
	let selectedGroup = sequencedGroups.get(action.rowIndex);
        console.log("selectedfirm - %s", selectedGroup); 
        portMap = state.get("groupPortMap").get(selectedGroup);         
        state = state.set("selectedGroup", sequencedGroups.get(action.rowIndex));
        return state = state.set("portsForSelectedGroup", portMap);
      case ActionTypes.CLOSE_PORTS:
        return state.set("selectedGroup", '').set("portsForSelectedGroup", Map());
      default:
        return state;
    }
  }

  _onSortChange(collection, colKey, colDir) {
    console.log("FirmStore:_onSortChange [colKey=%s, colDir=%s]", colKey, colDir);

    let sorted = collection.sortBy(
      (v, k) => {
        console.log(v.get(colKey));
        return v.get(colKey);
      },
      (a, b) => {
        let result = 0;
        if ( a < b ) {
          result = -1;
        } else if ( a == b ) {
          result = 0;
        } else {
          result = 1;
        }
        if (result !== 0 && colDir === SortDir.DESC) {
          result *= -1;
        }
        return result;
      }
    );
    console.log(sorted);
    return sorted;
  }

}

export default new FirmStore();
