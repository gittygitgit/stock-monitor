"use strict";
import EventEmitter from 'events';
//import {assign} from 'object-assign';
var assign = require('object-assign');
import ActionTypes from '../actions/ActionTypes';
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher'
import Immutable, {Map} from 'immutable';
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
    let firms = Map();
    return firms;
  }
 
  reduce(state, action) {
 //   console.log("FirmStore::reduce");
    switch (action.type) {
      case ActionTypes.INITIALIZE:
        console.log("INITIALIZE");
        let firms = FirmApi.getFirms();

        return state;
      case ActionTypes.ADD_FIRM:
//        console.log("ADD_FIRM");
        state = state.push({firm:action.firm.name, last:moment().format('hh:mm:ss.SSS')});
        return state;
      case ActionTypes.FIRM_EVENT:
//        console.log("FIRM_EVENT");
        
        // reset changed flag
        state = state.map( f => f.set("changed", false));
        let now  = state;
  
        let event = action.firm;
        let next = state.mergeDeep(Map().set(event.firm, Map(event).set("changed", true)));
        
        if (!now.equals(next)) {
//          console.log("state changed"); 
        }
        return next;
      case ActionTypes.SORT:
        console.log("FirmStore::reduce [actionType=SORT]");
        let sorted=action.sorted;
        state = sorted;
        return state;
      default:
        return state;
    }
  }
}

export default new FirmStore();
