"use strict"

import Immutable from 'immutable';
const { Map } = require('immutable')
const moment = require('moment');

class FirmApi {


  constructor() {
    console.log("FirmAPI");
    this.firms = Map();
    this.firms = this.firms.set("WOL2", {});
    this.firms = this.firms.set("CDRB", {});
    this.firms = this.firms.set("IMDB", {});
    this.firms = this.firms.set("GSM1", {});
  }

  firmEvent() {
    console.log(this.firms.count());
    console.log(Math.floor(Math.random() * (this.firms.count())));
    let randIdx = Math.floor(Math.random() * (this.firms.count()));
    let f = this.firms.keySeq().get(randIdx);
    let evt = {name: f, last:moment().format('hh:mm:ss.SSS')};
    return evt;
  }
  start() {
       
  }

  stop() {

  }
  
  getFirms() {
    return this.firms;
  }
}

export default new FirmApi();
