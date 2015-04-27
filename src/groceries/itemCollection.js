var _ = require('underscore');
var Backbone = require('backbone');
var BackbonePouch = require('backbone-pouch');
var PouchDB = require('pouchdb');

Backbone.sync = BackbonePouch.sync({
    // We currently suffix by the PouchDB version here
    // because at the moment PouchDB does not support upgrade
    db: new PouchDB('grocery-app')
});

var ItemModel = require('./item');

module.exports = Backbone.Collection.extend({
  model: ItemModel,
  pouch: {
    listen: true,
    fetch: 'query',
    options: {
      query: {
        include_docs: true,
        fun: {
          map: function(doc) {
            emit(doc.order, null);
          }
        }
      },
      changes: {
        include_docs: true
      }
    }
  },
  initialize: function(){
    this.listenTo(this, 'add', this.registerAdd);
  },
  registerAdd: function(){
    console.log("A new model was added. Here is the current collection: ", this);
  }
});
