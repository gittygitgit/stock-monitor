"use strict";

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../actions/actionTypes');
var _groupList = [];

_groupList.push({firm: "GSM1", last:'08:47:07.796'});
_groupList.push({firm: "WOL1", last:'00:00:00.000'});

var GroupStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT< callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getGroupList: function() {
    return _groupList;
  }
});

module.exports = GroupStore;
