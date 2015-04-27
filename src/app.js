var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');

var BackbonePouch = require('backbone-pouch');
var PouchDB = require('pouchdb');

Backbone.sync = BackbonePouch.sync({
    // We currently suffix by the PouchDB version here
    // because at the moment PouchDB does not support upgrade
    db: new PouchDB('grocery-app')
});

var ItemCollectionView = require('./groceries/itemCollectionView');
var ItemCollection = require('./groceries/itemCollection');

var AppNavView = require('./app/appNavView');



$(function() {
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


  //setTimeout(function(){GroceryList.add({title: "bananas", price: 3}); }, 3000);
  // console.log( "the selector", $('h1').html());
  // console.log(_.VERSION);
  // _.each([7,8], alert);

});
