var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var getStudentId = require('../common/handler/getStudentId');
var table = require('./handler/table');

var offsetApplySetAgree = table.table.offsetApplySetAgree;
var offsetApplyInfo = table.table.offsetApplyInfo;
var offsetApplyShow = table.table.offsetApplyShow;
var offsetApplyFile = table.table.offsetApplyFile;
var StudentId = getStudentId.getStudentId.studentId;

router.post('/assistants/offsetApply/setAgree', offsetApplySetAgree, function(req, res) {
// router.post('/assistants/SetOffsetApplyFormAgreeStatus', offsetApplySetAgree, function(req, res) {
    res.send(req.setAgree);
});

router.get('/assistants/offsetApply/Info', StudentId, offsetApplyInfo, function(req, res) {
// router.get('/assistants/credit/all', StudentId, offsetApplyInfo, function(req, res) {
    res.send(req.info);
});

router.get('/assistants/offsetApply/Show', csrfProtection, offsetApplyShow, function(req, res) {
// router.get('/assistants/ShowUserOffsetApplyForm', offsetApplyShow, function(req, res) {
    res.send(req.show);
});

router.post('/assistants/offsetApply/File', csrfProtection, offsetApplyFile, function(req, res) {
    res.send(req.file);
});

module.exports = router;
