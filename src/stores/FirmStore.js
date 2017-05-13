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
    console.log("FirmStore::ctor");
    super(AppDispatcher);
  }

  getInitialState() {
    let firms = Map();
    return firms;
  }
 
  reduce(state, action) {
    console.log("FirmStore::reduce");
    switch (action.type) {
      case ActionTypes.INITIALIZE:
        console.log("INITIALIZE");
        let firms = FirmApi.getFirms();

        let f1 = Map({"GSM1": Map({name: "GSM1", last:moment().format('hh:mm:ss.SSS'), changed: true})});        
        let f2 = Map({"WOL2": Map({name: "WOL2", last:moment().format('hh:mm:ss.SSS'), changed: true})});        
        state = state.mergeDeep(f1);
        state = state.mergeDeep(f2);

        /*firms = firms.push({firm: "GSM1", last:moment().format('hh:mm:ss.SSS')});
        firms = firms.push({firm: "WOL1", last:'00:00:00.000'});
        firms = firms.push({firm: "WOL2", last:'00:00:00.000'});
        firms = firms.push({firm: "WOL3", last:'00:00:00.000'});*/
        return state;
      case ActionTypes.ADD_FIRM:
        console.log("ADD_FIRM");
        state = state.push({name:action.firm.name, last:moment().format('hh:mm:ss.SSS')});
        return state;
      case ActionTypes.FIRM_EVENT:
        console.log("UPDATE_FIRM");
        console.log(state);
        
        // reset changed flag
        state = state.map( f => f.set("changed", false));
        
        let now  = state;
        let next = state.mergeDeep(Map().set(action.firm.name, Map({name: action.firm.name, last:action.firm.last, changed: true})));
        
        if (!now.equals(next)) {
          console.log("state changed"); 
        }
        return next;
      default:
        return state;
    }
  }
}

export default new FirmStore();
