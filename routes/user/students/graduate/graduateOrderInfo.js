var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var getStudentId = require('../../course/getStudentId');
var query = require('../../course/query');
var other = require('../../course/revise/Othercourse');
var cs = require('../../course/revise/CScourse');
var finalProcess = require('../../course/revise/final');
var nowOther = require('../../course/current/currentOther');
var nowCS = require('../../course/current/currentCS');
var orderInfo = require('../../course/revise/orderInfo');

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
var processFinal = finalProcess.finalProcess.processFinal;
var currentOther = nowOther.currentOther.processOther;
var currentCS = nowCS.currentCS.processCS;
var getOrderInfo = orderInfo.orderInfo.getOrderInfo;

router.get('/students/graduate/orderInfo', StudentId, StudentProfile, queryFree, queryGeneral, queryPass, queryCourse, queryNow, queryRule, processOther, processCS, processFinal, currentOther, currentCS, getOrderInfo, function(req, res){
	//console.log(res.locals.orderInfo);
    //console.log(res.locals.lanes['lanes']);
    res.send(JSON.stringify(res.locals.orderInfo));
});

module.exports = router;
