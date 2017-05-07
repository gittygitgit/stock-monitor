"use strict"

class FirmApi {


  constructor() {
    console.log("FirmAPI");
    this.firms=[];
    this.firms.push("WOL3");
    this.firms.push("CDRB");
    this.firms.push("IMDB");
    this.firms.push("CDRG");
  }

  firmEvent() {
    console.log(this.firms.length);
    console.log(Math.floor(Math.random() * (this.firms.length)));
  }
  start() {
       
  }

  stop() {

  }
}

export default new FirmApi();
