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
  * firms            - Map of firms, portFirmId => PortFirm
  * firmDetails      - Map of firm details, firm => firmDetail
  * ports - Map of port to port totals for a selected firm, port => ???
  * last             - Timestamp of last update received
  * totQuotes        - Total number of quotes for all groups
  * totBlocks        - Total number of blocks for all groups
  * totPurges        - Total number of purges for all groups
  * totUndPurges     - Total number of undPurges for all groups
  * selectedGroup    - Group selected

map of firmname to firm 
  * sortInfo   - single property value, key is colName, value is asc/desc
  */
class FirmStore extends ReduceStore {
  constructor() {
//    console.log("FirmStore::ctor");
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.fromJS({
      firms: Map(),
      ports: Map(),
      firmDetails: Map(),
      sortInfo: {last:SortDir.ASC},
      last: '',
      totQuotes: 0,
      totBlocks: 0,
      totPurges: 0,
      totUndPurges: 0,
      selectedGroup: '',
    })
    //return Map();
  }
 
  reduce(state, action) {
 //   console.log("FirmStore::reduce");
   switch (action.type) {
      case ActionTypes.INITIALIZE:
        console.log("INITIALIZE");
        debugger;
        // Get all portFirms
        //let firms = FirmApi.spinPortFirms().map(f => Map(f.id, f));
        // portFirm id => PortFirm
        let idToFirmPortMap = Map();
        // firmname => FirmDetail
        let firmToFirmTotalsMap = Map();
        // firmname => FirmDetail
        let firmToPortTotalsMap = Map();


        let portMap;
        FirmApi.spinPortFirms().forEach(pf => { 
          let firmName = pf.get("name");
          idToFirmPortMap = idToFirmPortMap.set(pf.get("id"), pf);
          let detail = null;
          if (!firmToFirmTotalsMap.has(firmName)) {
            detail = fromJS({
              last:         '00:00:00.000',
              firm:         firmName,
              port:         pf.get("port"),
              ring:         pf.get("ring"),
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
          let port = pf.get("port");
          portMap = portMap.set(
            port, fromJS(
              {
	        last:         '00:00:00.000',
		firm:         firmName,
		port:         pf.get("port"),
		ring:         pf.get("ring"),
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
            "firms":       firmToFirmTotalsMap,
            "firmDetails": firmToPortTotalsMap,
          })
        );
      case ActionTypes.ADD_FIRM:
//        console.log("ADD_FIRM");
        state = state.push({firm:action.firm.name, last:moment().format('hh:mm:ss.SSS')});
        return state;
      case ActionTypes.FIRM_EVENT:
//        console.log("FIRM_EVENT");
        
        // reset changed flag
        let curFirms  = state.get("firms");
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
        debugger;
        let curGroupPortMap = state.get("firmDetails");
        console.log("asdfas");     
        console.log(curGroupPortMap);
        let curPortsForFirm = curGroupPortMap.get(firmName);

 
        entry = Map().set(           
          event.port, 
	  eventMap.set("changed", false)
        );

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
	    state = state.set("ports", nextGroupPortMap.get(selectedGroup));
          }
        }

 
        let totQuotes = parseInt(state.get("totQuotes")) + event.quotes;
        let totBlocks = parseInt(state.get("totBlocks")) + event.blocks;
        let totPurges = parseInt(state.get("totPurges")) + event.purges;
        let totUndPurges= parseInt(state.get("totUndPurges")) + event.undPurges;

        return state.mergeDeep(
          fromJS({
            "firms":nextFirms,
            "firmDetails": nextGroupPortMap,
            "last": event.last,
            "totQuotes": totQuotes,
            "totBlocks": totBlocks,
            "totPurges": totPurges,
            "totUndPurges": totUndPurges,
          })
        );
      case ActionTypes.SORT:
        console.log("FirmStore::reduce [actionType=SORT]");
        console.log("sortCol=%s, sortDir=%s", action.sortCol, action.sortDir);
        console.log(state);
        let sorted=action.rows;
        console.log(sorted);
        let sortCol = action.sortCol;
        let sortDir = action.sortDir;
        return state.set("firms", sorted).set("sortInfo", Map({ [sortCol]:sortDir }));
      case ActionTypes.CLICK_GROUP_ROW:
        console.log("FirmStore::reduce [actionType=CLICK_GROUP_ROW]");
	let sequencedGroups = state.get("firms").keySeq();
	let selectedGroup = sequencedGroups.get(action.rowIndex);
        console.log("selectedfirm - %s", selectedGroup); 
        portMap = state.get("firmDetails").get(selectedGroup);         
        state = state.set("selectedGroup", sequencedGroups.get(action.rowIndex));
        return state = state.set("ports", portMap);
      case ActionTypes.CLOSE_PORTS:
        return state.set("selectedGroup", '').set("ports", Map());
      default:
        return state;
    }
  }
}

export default new FirmStore();
