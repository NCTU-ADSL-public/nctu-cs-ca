var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var table = require('./handler/table');
var getTeacherId = require('../common/handler/getTeacherId');

var TeacherId = getTeacherId.getTeacherId.teacherId;
var researchApplySetAgree = table.table.researchApplySetAgree;
var researchApplyList = table.table.researchApplyList;

router.post('/professors/researchApply/setAgree' , csrfProtection,researchApplySetAgree, function(req, res){
    res.send(req.setAgree);
});

router.get('/professors/researchApply/list',TeacherId, researchApplyList, function(req, res){
	res.send(req.list);
});

module.exports = router;