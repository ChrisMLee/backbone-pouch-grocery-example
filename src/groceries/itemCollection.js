var _ = require('underscore');
var Backbone = require('backbone');
var BackbonePouch = require('backbone-pouch');

var PouchDB = require('pouchdb');

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
  parse: function(result) {
      return _.pluck(result.rows, 'doc');
  },
  initialize: function(){
    this.listenTo(this, 'add', this.registerAdd);
  },
  registerAdd: function(){
    console.log("A new model was added. Here is the current collection: ", this);
  }
});
