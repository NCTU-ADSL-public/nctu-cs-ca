var express = require('express');
var router = express.Router();
var getStudentId = require('../common/handler/getStudentId');
var table = require('./handler/table');

var StudentId = getStudentId.getStudentId.studentId;
var courseMapRule = table.table.courseMapRule;
var courseMapPass = table.table.courseMapPass;
router.get('/students/courseMap/rule',StudentId,courseMapRule, function(req, res){
    res.send(req.rule);
});

router.get('/students/courseMap/pass',StudentId,courseMapPass, function(req, res){
    res.send(req.pass);

});

module.exports = router;

