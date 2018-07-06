var path = require('path');
var https = require('https');
var session = require('client-sessions');
var express = require('express');
var app = express();
var utils = require('./utils');
var randoms = require('./randomVals');
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
    duration: 40 * 60 * 1000,
    activeDuration : 25 * 60 * 1000,
  }));
  app.use(csrfProtection);
  app.use(require('./middleware/setCsrf').setCsrf);
  app.use(require('./middleware/setProfile').setProfile);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  //app.use('/students/*', require('./middleware/verifyUser').verifyUser, require('./middleware/verifyUser').verifyStudents, require('./middleware/verifyUser').verifyGrade);
  app.use('/students/*', require('./middleware/verifyUser').verifyUser, require('./middleware/verifyUser').verifyStudents);
  app.use('/assistants/*', require('./middleware/verifyUser').verifyUser, require('./middleware/verifyUser').verifyAssistants);
  app.use('/teachers/*', require('./middleware/verifyUser').verifyUser, require('./middleware/verifyUser').verifyProfessors);
//  app.use('/', express.static('./public', { index: 'index.login.html'}));
//  app.use('/students/head', express.static('./public', { index: 'index.student.html'}));
//  app.use('/assistants/head', express.static('./public', { index: 'index.assistant.html'}));
//  app.use('/assistants/head/s/:sid', express.static('./public', { index: 'index.assistant.html'}));
  app.use('/', express.static('./public', {index: 'index.html'}));
  app.use('/students/head', express.static('./public', {index: 'index.html'}));
  app.use('/teachers/head', express.static('./public', {index: 'index.html'}));
  app.use('/assistants/head', express.static('./public', {index: 'index.html'}));
  app.use('/assistants/head/s/:sid', express.static('./public', { index: 'index.html'}));

  app.use(require('./routes/user/students/profile'));
  app.use(require('./routes/user/students/courseMap'));
  app.use(require('./routes/user/students/coursePass'));
  app.use(require('./routes/logout'));
  app.use(require('./routes/auth/nctu/nctu'));
  app.use(require('./routes/user/students/graduate/graduateOriginal'));
  app.use(require('./routes/user/students/graduate/graduateRevised'));
  app.use(require('./routes/user/students/graduate/graduatePrint'));
  app.use(require('./routes/user/students/graduate/graduateEnglish'));
  app.use(require('./routes/user/students/graduate/graduateReorder'));
  app.use(require('./routes/user/students/graduate/graduateChange/graduateChange'));
  app.use(require('./routes/user/students/graduate/graduateOrderResult'));
  app.use(require('./routes/user/students/graduate/graduateReorderReset'));
  app.use(require('./routes/user/students/graduate/graduateOrderInfo'));
  app.use(require('./routes/user/students/getCourseInfo/getCourseInfo'));
  app.use(require('./routes/user/students/recommend/recommend'));
 // app.use(require('./routes/user/students/project'));
  app.use(require('./routes/user/students/projectNum'));
  app.use(require('./routes/user/students/project_apply'));
  app.use(require('./routes/user/students/ProInfo'));
  app.use(require('./routes/user/students/applyState'));
  app.use(require('./routes/user/students/formDelete'));
  app.use(require('./routes/user/students/editProject'));
  app.use(require('./routes/user/students/projectPage'));
  app.use(require('./routes/user/students/mail/sendtoteacher'));
  app.use(require('./routes/user/assistants/profile'));
  app.use(require('./routes/user/assistants/graduate/graduateOriginal'));
  app.use(require('./routes/user/assistants/graduate/graduateRevised'));
  app.use(require('./routes/user/assistants/graduate/graduatePrint'));
  app.use(require('./routes/user/assistants/graduate/graduateCheck'));
  app.use(require('./routes/user/assistants/graduate/graduateEnglish'));
  app.use(require('./routes/user/assistants/graduate/studentList'));
  app.use(require('./routes/user/assistants/getStudent'));
  app.use(require('./routes/user/professor/profile'));
  app.use(require('./routes/user/professor/courseInfo/score'));
  app.use(require('./routes/user/professor/courseInfo/interval'));
  app.use(require('./routes/user/professor/courseInfo/courses'));
  app.use(require('./routes/user/professor/courseInfo/courseNow'));
  app.use(require('./routes/user/professor/students/list'));
  app.use(require('./routes/user/professor/students/projects'));
  app.use(require('./routes/user/professor/students/applyList'));
  app.use(require('./routes/user/professor/students/ApplyFormSetAgree'));
  app.use(require('./routes/user/professor/students/setScore'));
  app.use(require('./routes/user/professor/info'));
  app.use(require('./routes/user/professor/students/setResearchTitle'));
  app.use(require('./routes/user/professor/students/researchInfo'));
  app.use(require('./routes/user/mail/getStudentList'));
  app.use(require('./routes/user/mail/getTeacherList'));
  app.use(require('./routes/user/mail/sendmail'));
  app.use(require('./routes/user/mail/readSet'));
  app.use(require('./routes/user/mail/sent'));
  app.use(require('./routes/user/mail/content'));
  app.use(require('./routes/user/mail/delete'));
  app.use(require('./routes/user/mail/inbox'));
 // app.use(require('./routes/user/students/mapPass'));
  return app;
};
