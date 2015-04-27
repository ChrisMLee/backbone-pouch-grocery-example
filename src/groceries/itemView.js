var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');

var groceryTemplate = require('./groceryTemplate.hbs');
var groceryCheckedTemplate = require('./groceryCheckedTemplate.hbs');

module.exports = Marionette.ItemView.extend({
  template: groceryTemplate,
  checkedTemplate: groceryCheckedTemplate,
  tagName: 'li',
  className: 'grocery',
  events:{
    'click .grocery-destroy':'groceryDestroy',
    'click [type="checkbox"]': 'toggleChecked'
  },
  modelEvents: {
    "change": "render"
  },
  groceryDestroy: function(){
    //alert('destroying grocery');
    this.model.destroy();
  },
  getTemplate: function(){
    if (this.model.get("purchased")){
      return this.checkedTemplate;
    } else {
      return this.template;
    }
  },
  toggleChecked: function() {
    console.log("TWAS CLICKED -", this.model.get('purchased'));
    return this.model.save('purchased', !this.model.get('purchased'));
  }
})
