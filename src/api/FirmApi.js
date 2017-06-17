"use strict"

import Immutable from 'immutable';
const { Map } = require('immutable')
const moment = require('moment');
import Firm from './Firm';
import FirmDetail from './FirmDetail';
class FirmApi {


  constructor() {
    console.log("FirmAPI");
    // this.firms = Map();
    // create a List of Maps
    this.portFirms = Immutable.fromJS([
      { id: 1, name: "WOL2", port: "CRWOL1", ring: "POEM" },
      { id: 2, name: "WOL2", port: "CRWOL2", ring: "POEM" },
      { id: 3, name: "WOL2", port: "CRWOL3", ring: "POEM" },
      { id: 4, name: "WOL2", port: "CRWOL4", ring: "POEM" },

      { id: 5, name: "GSM1", port: "CRGSM1", ring: "POEM" },
      { id: 6, name: "GSM1", port: "CRGSM2", ring: "POEM" },

      { id: 7, name: "SIG1", port: "CRSIG1", ring: "POEM" },
      { id: 8, name: "SIG1", port: "CRSIG2", ring: "POEM" },
      { id: 9, name: "SIG2", port: "CRSIG1", ring: "POEM" },
      { id: 10, name: "SIG2", port: "CRSIG2", ring: "POEM" },
      { id: 11, name: "THI7", port: "CRTHI1", ring: "POEM" },
      { id: 12, name: "THI7", port: "CRTHI2", ring: "POEM" },
      { id: 13, name: "THI7", port: "CRTHI3", ring: "POEM" },
      { id: 14, name: "THI7", port: "CRTHI4", ring: "POEM" },
      { id: 15, name: "THI7", port: "CRTHI5", ring: "POEM" },
      { id: 16, name: "THI7", port: "CRTHI6", ring: "POEM" },
      
    ]);

    /*this.firms = this.firms.set("WOL2", Map(new Firm(0, "WOL2", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)));
    this.firms = this.firms.set("CDRB", Map(new Firm(0, "CDRB", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)));
    this.firms = this.firms.set("IMDB", Map(new Firm(0, "IMDB", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)));
    this.firms = this.firms.set("GSM1", Map(new Firm(0, "GSM1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)));*/
  }

  randInt(low, high) {
    return Math.floor(Math.random() * high) + low;
  }

  firmEvent() {
    let randIdx = Math.floor(Math.random() * (this.portFirms.count()));
    let groupPort = this.portFirms.get(randIdx);

    let evt = {
      last: moment().format('hh:mm:ss.SSS'), // last
      firm: groupPort.get("name"),
      port: groupPort.get("port"),
      ring: groupPort.get("ring"),
      numBlocks:this.randInt(0, 10),             // blocks
      rateCurrent:.08,
      rate1Min:.11,
      rate5Min:.432,
      qlCurrent:23,
      ql1Min:44,
      limitCurrent:442,
      limit1Min:24342,
      limit5Min:22,
      quotes:this.randInt(0, 10),
      blocks:this.randInt(0, 10),
      purges:this.randInt(0, 10),
      undPurges:this.randInt(0, 10)};
      
    return evt;
  }
  start() {
       
  }

  stop() {

  }
  
  spinPortFirms() {
    return this.portFirms;
  }
}

export default new FirmApi();
