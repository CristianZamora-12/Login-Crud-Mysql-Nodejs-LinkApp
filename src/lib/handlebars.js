//Requerir Timeago.js
const { format } = require('timeago.js');

//Crear Objeto Helpers
const helpers = {};

//Ocupar Objeto
helpers.timeago = (timestamp) => {
  return format(timestamp);
};

//Export Handlebars
module.exports = helpers;
