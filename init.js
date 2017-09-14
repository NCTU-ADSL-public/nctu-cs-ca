var session = require('client-sessions');
var express = require('express');
var app = express();

module.exports.init = function(){

  app.set('view engine', 'ejs');

  app.use(session({
    cookieName: "session",
    secret: "19da32fgadiama007catflyingintheskyadsfdsaf",
    duration: 20 * 60 * 1000,
    activeDuration : 5 * 60 * 1000,
  }));

  app.use('/', express.static('./build'));
  app.use('/Head', express.static('./build'));
  app.use('/Login', express.static('./build'));
  app.use(require('./routes/auth/nctu/nctu.js'));
  
  return app;
};
