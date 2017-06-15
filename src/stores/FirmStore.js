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
  * firms        - Map of firms, portFirmId => PortFirm
  * firmDetails  - Map of firm details, firm => firmDetail
  * fortInfo
  * last
  * totQuotes
  * totBlocks
  * totPurges
  * totUndPurges
  *  

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
      firmDetails: Map(),
      sortInfo: {last:SortDir.ASC},
      last: '',
      totQuotes: 0,
      totBlocks: 0,
      totPurges: 0,
      totUndPurges: 0,

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


        let portList;
        FirmApi.spinPortFirms().forEach(pf => { 
          let firmName = pf.get("name");
          idToFirmPortMap = idToFirmPortMap.set(pf.get("id"), pf);
          let detail = null;
          if (!firmToFirmTotalsMap.has(firmName)) {
            detail = fromJS({
              last:'',
              firm:firmName,
              port:'',
              ring:'',
              numBlocks:0, 
              rateCurrent:0, 
              rate1Min:0, 
              rate5Min:0, 
              qlCurrent:0, 
              ql1Min:0, 
              limitCurrent:0, 
              limit1Min:0, 
              limit5Min:0, 
              quotes:0, 
              blocks:0, 
              purges:0, 
              undPurges:0});
            firmToFirmTotalsMap = firmToFirmTotalsMap.set(
              firmName, detail
            );
          } 
          
          debugger;   
          portList = firmToPortTotalsMap.get(firmName);
          if (portList === undefined) {
            portList = List();
          }
          portList = portList.push(
            fromJS(
	      '',
	      firmName,
	      pf.get("portName"),
	      pf.get("ring"), 
	      0,
	      0,
	      0,
	      0,
	      0,
	      0,
	      0,
	      0,
	      0,
	      0,
	      0,
	      0
            )
          );
    
        });

        firmToPortTotalsMap = firmToPortTotalsMap.set(firmName, portList);


        return state.mergeDeep(
          fromJS({
            "firms":       firmToFirmTotalsMap,
            "firmDetails": firmToPortTotalsMap
          })
        );
      case ActionTypes.ADD_FIRM:
//        console.log("ADD_FIRM");
        state = state.push({firm:action.firm.name, last:moment().format('hh:mm:ss.SSS')});
        return state;
      case ActionTypes.FIRM_EVENT:
//        console.log("FIRM_EVENT");
        
        // reset changed flag
        let now  = state.get("firms");
        now = now.map( f => f.set("changed", false));

        let event = action.firm;
        let firmName = event.firm;
        
	let entry = Map().set(firmName, Map(event));

        let next = now.mergeDeep(
          entry
        );
        
        if (!now.equals(next)) {
//          console.log("state changed"); 
            next = next.set(event.firm, next.get(event.firm).set("changed", true));
        }
       
        let totQuotes = parseInt(state.get("totQuotes")) + event.quotes;
        let totBlocks = parseInt(state.get("totBlocks")) + event.blocks;
        let totPurges = parseInt(state.get("totPurges")) + event.purges;
        let totUndPurges= parseInt(state.get("totUndPurges")) + event.undPurges;

        return state.mergeDeep(
          fromJS({
            "firms":next,
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

      default:
        return state;
    }
  }
}

export default new FirmStore();
