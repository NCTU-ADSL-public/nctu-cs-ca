var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var query = require('./query');
var other = require('./revise/Othercourse');
var cs = require('./revise/CScourse');
var print = require('./revise/print');
var finalProcess = require('./revise/final');

var queryPass = query.query.queryPass;
var queryCourse = query.query.queryCourse;
var queryRule = query.query.queryRule;
var queryFree = query.query.queryFree;
var queryGeneral = query.query.queryGeneral;
var processOther = other.Othercourse.processOther;
var processCS = cs.CScourse.processCS;
var processPrint = print.print.processPrint;
var processFinal = finalProcess.finalProcess.processFinal;


router.get('/students/graduate/print', queryFree, queryGeneral, queryPass, queryCourse, queryRule, processOther, processCS, processFinal, processPrint, function(req, res){
	res.send(res.locals.courseResult);

});

module.exports = router;
