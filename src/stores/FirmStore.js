"use strict";
import EventEmitter from 'events';
//import {assign} from 'object-assign';
var assign = require('object-assign');
import ActionTypes from '../actions/ActionTypes';
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher'
import Immutable, {Map, fromJS} from 'immutable';
import FirmApi from '../api/FirmApi'
const moment = require('moment');
//_groupList.push({firm: "GSM1", last:'08:47:07.796'});
//_groupList.push({firm: "WOL1", last:'00:00:00.000'});


class FirmStore extends ReduceStore {
  constructor() {
//    console.log("FirmStore::ctor");
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.fromJS({
      firms: Map()
    })
    //return Map();
  }
 
  reduce(state, action) {
 //   console.log("FirmStore::reduce");
    switch (action.type) {
      case ActionTypes.INITIALIZE:
        console.log("INITIALIZE");
        let firms = FirmApi.getFirms();
        return state.mergeDeep(
          fromJS({
            "firms": firms
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
        return state.mergeDeep(
          fromJS({
            "firms":next
          })
        );
      case ActionTypes.SORT:
        console.log("FirmStore::reduce [actionType=SORT]");
        console.log(state);
        let sorted=action.sorted;
        console.log(sorted);
        return state.set("firms", sorted);
      default:
        return state;
    }
  }
}

export default new FirmStore();
