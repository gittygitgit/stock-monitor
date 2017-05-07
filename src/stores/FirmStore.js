"use strict";
import EventEmitter from 'events';
//import {assign} from 'object-assign';
var assign = require('object-assign');
import ActionTypes from '../ActionTypes';
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher'
import Immutable from 'immutable';
const moment = require('moment');

//_groupList.push({firm: "GSM1", last:'08:47:07.796'});
//_groupList.push({firm: "WOL1", last:'00:00:00.000'});


class FirmStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    console.log("initial state");
    let firms = Immutable.List();
    firms = firms.push({firm: "GSM1", last:moment().format('hh:mm:ss.SSS')});
    firms = firms.push({firm: "WOL1", last:'00:00:00.000'});
    firms = firms.push({firm: "WOL2", last:'00:00:00.000'});
    firms = firms.push({firm: "WOL3", last:'00:00:00.000'});

    console.log("initial state2");
    console.log(firms);
    return firms;
    //return {"firms": firms};
  }
 
  reduce(state, action) {
    console.log(state);
    switch (action.type) {
      case ActionTypes.INITIALIZE:
        console.log("INITIALIZE");
        return state;
      case ActionTypes.ADD_FIRM:
        console.log("ADD_FIRM");
        state = state.push({firm:"MIKE", last:moment().format('hh:mm:ss.SSS')});
        console.log(state);
        return state;
      case ActionTypes.UPDATE_FIRM:
        console.log("UPDATE_FIRM");
        return state;
      default:
        return state;
    }
  }
}

export default new FirmStore();
