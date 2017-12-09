var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var getStudentId = require('../../course/getStudentId');
var query = require('../../course/query');
var other = require('../../course/original/Othercourse');
var cs = require('../../course/original/CScourse');
var result = require('../../course/courseResult');
var nowOther = require('../../course/current/currentOther');
var nowCS = require('../../course/current/currentCS');

var StudentId = getStudentId.getStudentId.studentId;
var StudentProfile = query.query.queryProfile;
var queryPass = query.query.queryPass;
var queryCourse = query.query.queryCourse;
var queryRule = query.query.queryRule;
var queryFree = query.query.queryFree;
var queryNow = query.query.queryNow;
var queryGeneral = query.query.queryGeneral;
var processOther = other.Othercourse.processOther;
var processCS = cs.CScourse.processCS;
var processResult = result.courseResult.processResult;
var currentOther = nowOther.currentOther.processOther;
var currentCS = nowCS.currentCS.processCS;

router.get('/assistants/graduate/original', StudentId, StudentProfile, queryFree, queryGeneral, queryPass, queryCourse, queryRule, queryNow, processOther, processCS, currentOther, currentCS, processResult, function(req, res){
	//console.log(res.locals.courseResult[2]);
    res.send(res.locals.courseResult);
});

module.exports = router;
