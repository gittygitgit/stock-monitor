"use strict"

import Immutable from 'immutable';
const { Map } = require('immutable')
const moment = require('moment');
import Firm from './Firm';
class FirmApi {


  constructor() {
    console.log("FirmAPI");
    this.firms = Map();
    this.firms = this.firms.set("WOL2", {});
    this.firms = this.firms.set("CDRB", {});
    this.firms = this.firms.set("IMDB", {});
    this.firms = this.firms.set("GSM1", {});
  }

  randInt(low, high) {
    return Math.floor(Math.random() * high) + low;
  }

  firmEvent() {
    let randIdx = Math.floor(Math.random() * (this.firms.count()));
    let f = this.firms.keySeq().get(randIdx);
    //let evt = {name: f, last:moment().format('hh:mm:ss.SSS')};
    let evt = new Firm(
      moment().format('hh:mm:ss.SSS'), // last
      f,                               // firm
      this.randInt(0, 10),             // blocks
      .08,                             // curr rate
      .11,                             // 1min rate
      .432,                            // 5min rate
      23,                              // curr ql
      44,                              // 1min ql
      442,                             // curr l
      24342,                           // 1min l
      22,                              // 5min l
      this.randInt(0, 10),            // quotes
      this.randInt(0, 10),            // blocks
      this.randInt(0, 10),            // purges
      this.randInt(0, 10)             // und purges
    ); 
      
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
