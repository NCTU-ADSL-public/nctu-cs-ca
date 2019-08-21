var express = require('express');
var apps = express();
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var getStudentId = require('../common/handler/getStudentId');
var table = require('../common/handler/graduate/table');
var other = require('../common/handler/graduate/course/Othercourse');
var cs = require('../common/handler/graduate/course/CScourse');
var nowOther = require('../common/handler/graduate/course/currentOther');
var nowCS = require('../common/handler/graduate/course/currentCS');
var result = require('../common/handler/graduate/course/courseResult');
var restore = require('../common/handler/graduate/course/restore');
var methods = require('../common/handler/graduate/courseMove/methods');
var checkCard = methods.method.checkCard;

var StudentId = getStudentId.getStudentId.studentId;
var StudentProfile = table.table.queryProfile;
var queryPass = table.table.queryPass;
var queryCourse = table.table.queryCourse;
var queryRule = table.table.queryRule;
var queryFree = table.table.queryFree;
var queryNow = table.table.queryNow;
var queryChange = table.table.queryChange;
var queryGeneral = table.table.queryGeneral;
var processOther = other.Othercourse.processOther;
var graduateCheck = table.table.graduateCheck;
var getGraduateCheck = table.table.getGraduateCheck;
var getGraduateEnglish = table.table.getGraduateEnglish;
var graduateSummaryList = table.table.graduateSummaryList;
var graduateResetMove = table.table.graduateResetMove;
var graduateMoveCourse = table.table.graduateMoveCourse;
var processCS = cs.CScourse.processCS;
var processResult = result.courseResult.processResult;
var processRestore = restore.restore.processRestore;
var currentOther = nowOther.currentOther.processOther;
var currentCS = nowCS.currentCS.processCS;



router.post('/students/graduate/detail',csrfProtection, StudentId, StudentProfile, queryFree, queryGeneral, queryPass,queryChange, queryCourse, queryNow,queryRule,processOther, processCS, currentOther, currentCS, processRestore, processResult, function(req, res){
    res.send(res.locals.courseResult);

});

router.post('/students/graduate/check', csrfProtection, StudentId, graduateCheck, function(req, res){
	res.send(req.checkState);
});

router.get('/students/graduate/check',StudentId, getGraduateCheck,function(req, res){
    res.send(req.checkState);
});

router.get('/students/graduate/english', StudentId,getGraduateEnglish, function(req, res){
    res.send(req.english);
});

router.post('/students/graduate/summaryList',csrfProtection, StudentId, StudentProfile, queryFree, queryGeneral, queryPass, queryChange, queryCourse, queryNow,queryRule, processOther, processCS, currentOther, currentCS,  processRestore, processResult, graduateSummaryList, function(req, res) {
    res.send(req.summaryList);
});

router.post('/students/graduate/resetMove',csrfProtection,graduateResetMove, function(req, res){
	res.send(req.signal);
});

router.post('/students/graduate/moveCourse', csrfProtection, graduateMoveCourse, function(req, res){
	res.send(req.signal);
});

router.post('/students/graduate/legalMoveTarget', csrfProtection, StudentId, checkCard);

module.exports = router;
