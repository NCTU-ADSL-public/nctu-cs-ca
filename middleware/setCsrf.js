var utils = require('../utils');
var csrf = require('csurf');
var csrfProtection = csrf();

module.exports.setCsrf = function(req, res, next){
  let csrftoken = req.csrfToken();
  res.locals.csrfToken = csrftoken;
  res.cookie('XSRF-TOKEN', csrftoken);
  next();
}
