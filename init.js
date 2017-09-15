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

  app.use(require('./middleware/setProfile').setProfile);
  app.use('/', express.static('./build'));
  app.use('/teacherHead', express.static('./build'));
  app.use('/Head', require('./utils').verifyUser,  express.static('./build'));
  app.use('/Login', express.static('./build'));
  app.use(require('./routes/auth/nctu/nctu'));
  app.use(require('./routes/students/profile'));
  app.use(require('./routes/students/courseMap'));
  app.use(require('./routes/students/coursePass'));
  app.use(require('./routes/logout'));
  
  return app;
};
