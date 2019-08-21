var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var query = require('../../../db/msql');
var getStudentId = require('../common/handler/getStudentId');
var table = require('./handler/table');


var StudentId = getStudentId.getStudentId.studentId;
var offsetApplyList = table.table.offsetApplyList;
var offsetCreateCompulsory = table.table.offsetCreateCompulsory;
var offsetCreateEnglish = table.table.offsetCreateEnglish;
var offsetCreateExempt = table.table.offsetCreateExempt;
var offsetCreateWaive = table.table.offsetCreateWaive;
var offsetApplyEdit = table.table.offsetApplyEdit;
var offsetApplyDelete = table.table.offsetApplyDelete;

router.get('/students/offsetApply/list', StudentId, offsetApplyList, function(req, res){
    res.send(req.list);
});

router.post('/students/offsetApply/createCompulsory', csrfProtection,StudentId, offsetCreateCompulsory, function(req, res){
    res.send(req.createCompulsory);
        
});
router.post('/students/offsetApply/createEnglish', csrfProtection, StudentId, offsetCreateEnglish,function(req, res){
    res.send(req.createEnglish);
        
});

router.post('/students/offsetApply/createExempt', csrfProtection, StudentId, offsetCreateExempt, function(req, res) {
    res.send(req.createExempt)
});

router.post('/students/offsetApply/createWaive', csrfProtection, StudentId,offsetCreateWaive, function(req, res) {
    res.send(req.createWaive);
});

router.post('/students/offsetApply/edit',csrfProtection, StudentId, offsetApplyEdit, function(req, res) {
    res.send(req.edit);
});

router.post('/students/offsetApply/delete', csrfProtection, StudentId, offsetApplyDelete, function(req, res) {
    res.send(req.delete);
});


module.exports = router;
