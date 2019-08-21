var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var getStudentId = require('../common/handler/getStudentId');
var table = require('./handler/table');
var gtable = require('../common/handler/graduate/table');
var other = require('../common/handler/graduate/course/Othercourse');
var cs = require('../common/handler/graduate/course/CScourse');
var nowOther = require('../common/handler/graduate/course/currentOther');
var nowCS = require('../common/handler/graduate/course/currentCS');
var restore = require('../common/handler/graduate/course/restore');
var result = require('../common/handler/graduate/course/courseResult');

var studentId = getStudentId.getStudentId.studentId;
var graduateStudentListDownload = table.table.graduateStudentListDownload;
var graduateStudentList = table.table.graduateStudentList;
var getGraduateEnglish = gtable.table.getGraduateEnglish;
var getGraduateCheck = gtable.table.getGraduateCheck;
var graduateStudentListUpdate = table.table.graduateStudentListUpdate;
var getGradeStudentId = gtable.table.getGradeStudentId;


var studentProfile = gtable.table.queryProfile;
var queryFree = gtable.table.queryFree;
var queryGeneral = gtable.table.queryGeneral;
var queryPass = gtable.table.queryPass;
var queryChange = gtable.table.queryChange;
var queryCourse = gtable.table.queryCourse;
var queryNow = gtable.table.queryNow;
var queryRule = gtable.table.queryRule;
var processOther = other.Othercourse.processOther;
var processCS = cs.CScourse.processCS;
var currentOther = nowOther.currentOther.processOther;
var currentCS = nowCS.currentCS.processCS;
var processRestore = restore.restore.processRestore;
var processResult = result.courseResult.processResult;

router.post('/assistants/graduate/studentListDownload', csrfProtection, graduateStudentListDownload, function(req, res) {
// router.post('/assistants/graduate/graduateListDownload', csrfProtection, graduateStudentListDownload, function(req, res) {
    res.send(req.studentListDownload);
});

router.post('/assistants/graduate/studentList', graduateStudentList, function(req, res) {
// router.post('/assistants/graduate/graduateStudent', graduateStudentList, function(req, res) {
    res.send(req.studentList);
});

router.get('/assistants/graduate/english', studentId, getGraduateEnglish, function(req, res) { 
    res.send(req.english);
});

router.get('/assistants/graduate/check', studentId, getGraduateCheck, function(req, res) {
    res.send(req.checkState);
});


router.get('/assistants/graduate/detail', studentId, studentProfile, queryFree, queryGeneral, queryPass, queryChange, queryCourse, queryNow, queryRule, processOther, processCS, currentOther, currentCS, processRestore, processResult, function(req, res) {
// router.get('/assistants/graduate/revised', studentId, studentProfile, queryFree, queryGeneral, queryPass, queryChange, queryCourse, queryNow, queryRule, processOther, processCS, currentOther, currentCS, processRestore, processResult, function(req, res) {
    res.send(res.locals.courseResult);
});


router.get('/assistants/graduate/studentListUpdate', studentId, studentProfile, queryFree, queryGeneral, queryPass, queryChange, queryCourse, queryNow, queryRule, processOther, processCS, currentOther, currentCS,  processRestore, processResult, graduateStudentListUpdate, function(req, res) {
// router.get('/assistants/graduate/graduateList', studentId, studentProfile, queryFree, queryGeneral, queryPass, queryChange, queryCourse, queryNow,queryRule, processOther, processCS, currentOther, currentCS,  processRestore, processResult, function(req, res) {
   res.send(req.studentListUpdate); 
});

router.post('/assistants/graduate/gradeStudentId', csrfProtection, getGradeStudentId, function(req, res) {
// router.post('/assistants/graduate/gradeStudent', csrfProtection, getGradeStudentId, function(req, res) {
    res.send(req.studentId);
});



module.exports = router;
