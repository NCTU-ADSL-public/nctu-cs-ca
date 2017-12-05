var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var getStudentId = require('../../course/getStudentId');
var query = require('../../course/query');
var other = require('../../course/revise/Othercourse');
var cs = require('../../course/revise/CScourse');
var nowOther = require('../../course/current/currentOther');
var nowCS = require('../../course/current/currentCS');
var result = require('../../course/courseResult');
var finalProcess = require('../../course/revise/final');
var restore = require('../../course/revise/restore');

var StudentId = getStudentId.getStudentId.studentId;
var StudentProfile = query.query.queryProfile;
var queryPass = query.query.queryPass;
var queryCourse = query.query.queryCourse;
var queryRule = query.query.queryRule;
var queryFree = query.query.queryFree;
var queryNow = query.query.queryNow;
var queryChange = query.query.queryChange;
var queryGeneral = query.query.queryGeneral;
var processOther = other.Othercourse.processOther;
var processCS = cs.CScourse.processCS;
var processResult = result.courseResult.processResult;
var processFinal = finalProcess.finalProcess.processFinal;
var processRestore = restore.restore.processRestore;
var currentOther = nowOther.currentOther.processOther;
var currentCS = nowCS.currentCS.processCS;



router.get('/students/graduate/revised', StudentId, StudentProfile, queryFree, queryGeneral, queryPass, queryChange, queryCourse, queryNow,queryRule, processOther, processCS, processFinal, currentOther, currentCS, processRestore, processResult, function(req, res){
	//console.log(" get revised");
    res.send(res.locals.courseResult);

});

module.exports = router;
