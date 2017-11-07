var randoms = require('./randomVals');
var path = require('path');
var https = require('https');
var session = require('client-sessions');
var express = require('express');
var app = express();
var utils = require('./utils');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var csrfProtection = csrf();
var helmet = require('helmet');


module.exports.init = function(){

  app.use(helmet());
  //app.use(require('./middleware/setSession').setSession);
  app.use(session({
    cookieName: "session",
    secret: randoms.randomVals.sessionKey,
    httpOnly: true,
    secure: true,
    duration: 20 * 60 * 1000,
    activeDuration : 5 * 60 * 1000,
  }));
  app.use(csrfProtection);
  app.use(require('./middleware/setCsrf').setCsrf);
  app.use(require('./middleware/setProfile').setProfile);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(csrfProtection);
  app.use(require('./middleware/setCsrf').setCsrf);
  app.use(require('./middleware/setProfile').setProfile);
  app.use('/', express.static('./public', { index: 'index.login.html'}));
  app.use('/students/Head', require('./middleware/verifyUser').verifyUser, require('./middleware/verifyUser').verifyStudents, express.static('./public', { index: 'index.student.html'}));
  app.use('/assistants/Head', require('./middleware/verifyUser').verifyUser,  require('./middleware/verifyUser').verifyAssistants, express.static('./public', { index: 'index.assistant.html'}));

  app.use(require('./routes/user/students/profile'));
  app.use(require('./routes/user/students/courseMap'));
  app.use(require('./routes/user/students/coursePass'));
  app.use(require('./routes/user/students/score'));
  app.use(require('./routes/logout'));
  app.use(require('./routes/auth/nctu/nctu'));
  app.use(require('./routes/user/students/graduate/graduate'));
  app.use(require('./routes/user/students/graduate/graduateRevised'));
  app.use(require('./routes/user/students/graduate/graduatePrint'));
  app.use(require('./routes/user/students/graduate/graduateCheck'));
  app.use(require('./routes/user/assistants/profile'));
  app.use(require('./routes/user/assistants/graduate/graduate'));
  app.use(require('./routes/user/assistants/graduate/graduateRevised'));


  return app;
};
