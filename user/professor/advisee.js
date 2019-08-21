var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var getTeacherId = require('../common/handler/getTeacherId');
var table = require('./handler/table');

var TeacherId = getTeacherId.getTeacherId.teacherId;
var adviseeSemesterGradeList = table.table.adviseeSemesterGradeList;
var adviseeList = table.table.adviseeList;
var adviseePersonalInfo = table.table.adviseePersonalInfo;

router.post('/professors/advisee/semesterGradeList',csrfProtection,adviseeSemesterGradeList, function(req, res){
    res.send(req.semesterGradeList);
});
router.get('/professors/advisee/list',TeacherId,adviseeList, function(req, res){
    res.send(req.list);
});
router.post('/professors/advisee/personalInfo',csrfProtection, adviseePersonalInfo, function(req, res){
	res.send(req.personalInfo);
});
module.exports = router;
