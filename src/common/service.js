var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.Object.extend({
  constructor:function() {
    if (this.channelName) {
      this.channel = Radio.channel(_.result(this, 'channelName'));
    }

    Marionette.Object.apply(this, arguments);
  },

  start: function() {
    this.triggerMethod('before:start');
    this._isStarted = true;
    this.triggerMethod('start');
  },

  stop: function() {
    this.triggerMethod('before:stop');
    this._isStarted = false;
    this.triggerMethod('stop');
  },

  isStarted: function() {
    return this._isStarted === true;
  }
});
