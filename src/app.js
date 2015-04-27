var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');

var BackbonePouch = require('backbone-pouch');
var PouchDB = require('pouchdb');

var ItemCollectionView = require('./groceries/itemCollectionView');
var ItemCollection = require('./groceries/itemCollection');

var AppNavView = require('./app/appNavView');



$(function() {
  Backbone.sync = BackbonePouch.sync({
    db: new PouchDB('grocery-app')
  });

  Backbone.Model.prototype.idAttribute = '_id';

  var GroceryList = new ItemCollection();

  var onSuccess = function(collection, response, options){
    console.log("The fetched GroceryList:", collection);
  }

  GroceryList.fetch({success: onSuccess});

  var groceryCollectionView = new ItemCollectionView({collection: GroceryList});
  var appNavView = new AppNavView();

  var region = new Marionette.Region({
    el: "#app-list"
  });

  var region2 = new Marionette.Region({
    el: "#app-nav"
  });

  region.show(groceryCollectionView);

  region2.show(appNavView);

});
