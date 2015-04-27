var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Model.prototype.idAttribute = '_id';

module.exports = Backbone.Model.extend({
    defaults: function() {
      return {
        title: "empty grocery item...",
        price: 0,
        purchased: false
      };
    }
});
