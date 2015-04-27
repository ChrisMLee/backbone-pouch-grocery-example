var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');

Backbone.Syphon = require('backbone.syphon');

var AppNavTemplate = require('./appNavTemplate.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
  template: AppNavTemplate,
  events: {
    "submit form": "formSubmitted"
  },
  formSubmitted: function(e){
    e.preventDefault();
    var data = Backbone.Syphon.serialize(this);
    console.log('form submitted. heres the data: ', data);
    Backbone.trigger('groceryItem:created', data);

    $('#app-nav-groceryItem').children('input[type="text"]').val('');
    //$('#app-nav-groceryItem').reset();
    // var data = Backbone.Syphon.serialize(this);
    // this.model.set(data);
    // this.model.save();
  }
});
