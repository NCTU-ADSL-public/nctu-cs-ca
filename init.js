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

module.exports.init = function(){
  app.use(session({
    cookieName: "session",
    secret: randoms.randomVals.sessionKey,
    httpOnly: true,
    secure: true,
    duration: 20 * 60 * 1000,
    activeDuration : 5 * 60 * 1000,
  }));
  app.use(require('./middleware/setProfile').setProfile);
  app.use('/', express.static('./public'));
  // app.use(cookieParser());
  //app.use(csrfProtection);
/*  app.use(function(req, res, next){
    let csrftoken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrftoken);
    res.locals.csrfToken = csrftoken;
    console.log(res.locals.csrfToken);
    next();
  });*/
  //app.use('/professors/Head', require('./utils').verifyUser, express.static('./DogUserInput'));
  //app.use('/assistants/Head', require('./utils').verifyUser, express.static('./Bulb'));
  //app.use('/students/Head', require('./utils').verifyUser,  express.static('./public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use('/students/Head', require('./utils').verifyUser,  express.static('./public'));
  app.use('/assistants/Head', require('./utils').verifyUser,  express.static('./public'));
  //app.get('/profilePic.png', function (req, res) {
  //  var personId = utils.getPersonId(JSON.parse(req.session.profile));    
  //  res.sendFile(path.join(__dirname, '/profilePic') + '/' + personId + '.png');
  //}); 

  //app.get('/profilePicCrop.png', function (req, res) {
  //  var personId = utils.getPersonId(JSON.parse(req.session.profile));    
  //  res.sendFile(path.join(__dirname, '/profilePic') + '/' + personId + '_crop.png');
  //}); 
  //app.engine('html', require('ejs').renderFile);
  //app.use('/students/ProfilePic', require('./utils').verifyUser, function(req, res){
  //	res.render(__dirname + '/routes/user/students/profilePic.html');
  //});
  //app.use('/students/ProfilePic', require('./utils').verifyUser,  express.static('./routes/user/students/profilePic.html'));
  //app.use('/Login', express.static('./public'));
  app.use(require('./routes/user/students/profile'));
  app.use(require('./routes/user/students/profilePic'));
  app.use(require('./routes/user/students/courseMap'));
  app.use(require('./routes/user/students/coursePass'));
  app.use(require('./routes/user/students/score'));
  app.use(require('./routes/logout'));
  app.use(require('./routes/user/state'));
  app.use(require('./routes/auth/nctu/nctu'));
  app.use(require('./routes/auth/google/google'));
  app.use(require('./routes/auth/facebook/facebook'));
  app.use(require('./routes/user/students/graduate/graduate'));
  app.use(require('./routes/user/students/graduate/graduateRevised'));
  app.use(require('./routes/user/students/graduate/graduatePrint'));
  app.use(require('./routes/user/students/graduate/graduateCheck'));
  app.use(require('./routes/user/assistants/graduate/graduate'));
  app.use(require('./routes/user/assistants/graduate/graduateRevised'));
  return app;
};
