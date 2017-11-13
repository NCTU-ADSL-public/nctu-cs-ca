var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var getStudentId = require('../../course/getStudentId');
var query = require('../../course/query');
var other = require('../../course/revise/Othercourse');
var cs = require('../../course/revise/CScourse');
var result = require('../../course/courseResult');
var finalProcess = require('../../course/revise/final');
var nowOther = require('../../course/current/currentOther');
var nowCS = require('../../course/current/currentCS');

var StudentId = getStudentId.getStudentId.studentId;
var queryPass = query.query.queryPass;
var queryCourse = query.query.queryCourse;
var queryRule = query.query.queryRule;
var queryFree = query.query.queryFree;
var queryNow = query.query.queryNow;
var queryGeneral = query.query.queryGeneral;
var processOther = other.Othercourse.processOther;
var processCS = cs.CScourse.processCS;
var processResult = result.courseResult.processResult;
var processFinal = finalProcess.finalProcess.processFinal;
var currentOther = nowOther.currentOther.processOther;
var currentCS = nowCS.currentCS.processCS;

router.get('/assistants/graduate/revised', StudentId, queryFree, queryGeneral, queryPass, queryCourse, queryNow,queryRule, processOther, processCS, processFinal, processResult, currentOther, currentCS, function(req, res){
	res.send(res.locals.courseResult);

});

module.exports = router;
