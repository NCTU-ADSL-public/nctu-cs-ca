var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var query = require('./query');
var other = require('./revise/Othercourse');
var cs = require('./revise/CScourse');
var nowOther = require('./current/currentOther');
var nowCS = require('./current/currentCS');
var result = require('./courseResult');

var finalProcess = require('./revise/final');
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


router.get('/students/graduate/revised', queryFree, queryGeneral, queryPass, queryCourse, queryNow,queryRule, processOther, processCS, processFinal, processResult, currentOther, currentCS, function(req, res){
	res.send(res.locals.courseResult);

});

module.exports = router;
