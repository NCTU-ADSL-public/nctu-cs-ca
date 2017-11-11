var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var query = require('./query');
var other = require('./original/Othercourse');
var cs = require('./original/CScourse');
var result = require('./courseResult');
var nowOther = require('./current/currentOther');
var nowCS = require('./current/currentCS');

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

router.get('/students/graduate/original', queryFree, queryGeneral, queryPass, queryCourse, queryRule, queryNow, processOther, processCS, processResult, currentOther, currentCS, function(req, res){
	res.send(res.locals.courseResult);
});

module.exports = router;
