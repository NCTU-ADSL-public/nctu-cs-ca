var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var table = require('./handler/table');
var getTeacherId = require('../common/handler/getTeacherId');


var csrf = require('csurf');
var csrfProtection = csrf();

var TeacherId = getTeacherId.getTeacherId.teacherId;
var curriculumAllCourses = table.table.curriculumAllCourses;
var curriculumScoreInterval = table.table.curriculumScoreInterval;
var curriculumScoreDetail = table.table.curriculumScoreDetail;

/*老師所有開過的課*/
router.get('/professors/curriculum/allCourses',TeacherId,curriculumAllCourses, function(req, res){
    res.send(req.allCourses);
});

/*某堂課成績區間人數*/
router.post('/professors/curriculum/scoreInterval', csrfProtection,curriculumScoreInterval, function(req, res){
    res.send(req.scoreInterval);
});

/*某堂課成績的詳細資料*/
router.post('/professors/curriculum/scoreDetail', csrfProtection,curriculumScoreDetail, function(req, res){
    res.send(req.scoreDetail);
});

module.exports = router;
