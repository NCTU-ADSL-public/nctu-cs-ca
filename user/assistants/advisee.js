var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var getStudentId = require('../common/handler/getStudentId');
var table = require('./handler/table');

var StudentId = getStudentId.getStudentId.studentId;
var adviseeTeacherList = table.table.adviseeTeacherList;
var adviseeStudentList = table.table.adviseeStudentList;
var adviseeSemesterScoreList = table.table.adviseeSemesterScoreList;

router.get('/assistants/advisee/teacherList', csrfProtection, adviseeTeacherList, function(req, res) {
// router.get('/assistants/advisee/TeacherList', csrfProtection, adviseeTeacherList, function(req, res) {
    res.send(req.teacherList);
});

router.post('/assistants/advisee/studentList', csrfProtection, adviseeStudentList, function(req, res) {
// router.post('/assistants/advisee/StudentList', csrfProtection, adviseeStudentList, function(req, res) {
    res.send(req.studentList);
});

router.post('/assistants/advisee/semesterScoreList', csrfProtection, adviseeSemesterScoreList, function(req, res) {
// router.post('/StudentGradeList', csrfProtection, adviseeSemesterScoreList, function(req, res) {
    res.send(req.scoreList);
});

module.exports = router;
