var helmet = require('helmet');
var path = require('path');
var https = require('https');
var session = require('client-sessions');
var express = require('express');
var app = express();
var multer = require('multer');
module.exports.init = function(){
  app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
  });
  app.set('view engine', 'ejs');
  app.use(session({
    cookieName: "session",
    secret: "19da32fgadiama007catflyingintheskyadsfdsaf",
    duration: 20 * 60 * 1000,
    activeDuration : 5 * 60 * 1000,
  }));
  app.use(helmet.noCache());
  app.use(require('./middleware/setProfile').setProfile);
  app.use('/', express.static('./build'));
  //app.use('/professors/Head', require('./utils').verifyUser, express.static('./DogUserInput'));
  //app.use('/assistants/Head', require('./utils').verifyUser, express.static('./Bulb'));
  app.use('/students/Head', require('./utils').verifyUser,  express.static('./build'));
  app.use('/Login', express.static('./build'));
  app.use(require('./routes/user/students/profile'));
  app.use(require('./routes/user/students/courseMap'));
  app.use(require('./routes/user/students/coursePass'));
  app.use(require('./routes/user/students/score'));
  app.use(require('./routes/logout'));
  app.use(require('./routes/user/state'));
  app.use(require('./routes/auth/nctu/nctu'));

  return app;
};
