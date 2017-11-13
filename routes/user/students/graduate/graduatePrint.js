var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var getStudentId = require('../../course/getStudentId');
var query = require('../../course/query');
var other = require('../../course/revise/Othercourse');
var cs = require('../../course/revise/CScourse');
var print = require('../../course/revise/print');
var finalProcess = require('../../course/revise/final');

var StudentId = getStudentId.getStudentId.studentId;
var queryPass = query.query.queryPass;
var queryCourse = query.query.queryCourse;
var queryRule = query.query.queryRule;
var queryFree = query.query.queryFree;
var queryGeneral = query.query.queryGeneral;
var processOther = other.Othercourse.processOther;
var processCS = cs.CScourse.processCS;
var processPrint = print.print.processPrint;
var processFinal = finalProcess.finalProcess.processFinal;


router.get('/students/graduate/print', StudentId, queryFree, queryGeneral, queryPass, queryCourse, queryRule, processOther, processCS, processFinal, processPrint, function(req, res){
	res.send(res.locals.courseResult);

});

module.exports = router;
