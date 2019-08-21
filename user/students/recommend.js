var express = require('express');
var router = express.Router();
var table = require('./handler/table');
var csrf = require('csurf');
var csrfProtection = csrf();
var getStudentId = require('../common/handler/getStudentId');


var StudentId = getStudentId.getStudentId.studentId;
var recommendCourseList = table.table.recommendCourseList;
var recommendSetStar = table.table.recommendSetStar;
var recommendCurrent = table.table.recommendCurrent;

router.get('/students/recommend/courseList', StudentId, recommendCourseList, function(req, res){
    res.send(req.courseList);
});

router.post('/students/recommend/setStar',csrfProtection, recommendSetStar, function(req, res){
    res.send(req.setStar);
    
});

router.get('/students/recommend/current', StudentId, recommendCurrent, function(req, res){
    res.send(req.current);
});

module.exports = router;
