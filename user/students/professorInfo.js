var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var getStudentId = require('../common/handler/getStudentId');
var table = require('./handler/table');

var StudentId = getStudentId.getStudentId.studentId;
var professorInfoPastResearch = table.table.professorInfoPastResearch;
var professorInfoList = table.table.professorInfoList;
var professorInfoGetMentor = table.table.professorInfoGetMentor;
router.post('/students/professorInfo/pastResearch',csrfProtection,professorInfoPastResearch, function(req, res){
	res.send(req.pastResearch);
});

router.get('/students/professorInfo/list',csrfProtection, professorInfoList, function(req, res){

	res.send(req.list);
});
router.get('/students/professorInfo/getMentor', StudentId,professorInfoGetMentor, function(req, res){

    res.send(req.getMentor);
});
module.exports = router;
