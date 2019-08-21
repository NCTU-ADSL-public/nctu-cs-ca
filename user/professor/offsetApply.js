var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var getTeacherId = require('../common/handler/getTeacherId');
var table = require('./handler/table');

var TeacherId = getTeacherId.getTeacherId.teacherId;
var offsetApplySetAgree = table.table.offsetApplySetAgree;
var offsetApplyFormList = table.table.offsetApplyFormList;

router.post('/professors/offsetApply/setAgree', csrfProtection,offsetApplySetAgree, function(req, res){
    res.send(req.setAgree);
});

router.get('/professors/offsetApply/formList', TeacherId, offsetApplyFormList,function(req, res){
    res.send(req.formList);
});

module.exports = router;
