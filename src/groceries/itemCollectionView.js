var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');

var ItemView = require('./itemView');
// var doneTemplate = require('../templates/doneTemplate.hbs');

module.exports = Marionette.CollectionView.extend({
  className: 'grocery-list',
  tagName: 'ul',
  childView: ItemView,
  initialize: function(){
    this.listenTo(Backbone, 'groceryItem:created', this.addOne);
  },
  addOne: function(model){
    this.collection.create(model);
  }
  //emptyView: EmptyView,
});
