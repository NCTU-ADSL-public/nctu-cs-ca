var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var getStudentId = require('../common/handler/getStudentId');
var table = require('./handler/table');

var createApplyPeriod = table.table.createApplyPeriod;
var setApplyPeriod = table.table.setApplyPeriod;
var showApplyPeriod = table.table.showApplyPeriod;
var StudentId = getStudentId.getStudentId.studentId;

router.post('/assistants/createTimes', csrfProtection, createApplyPeriod, function(req, res) {
    res.send(req.createApplyPeriod);
});

router.post('/assistants/setTimes', csrfProtection, setApplyPeriod, function(req, res) {
    res.send(req.setApplyPeriod);
});

router.post('/assistants/getTimes', csrfProtection, showApplyPeriod, function(req, res) {
//router.get('/assistants/getTimes', showApplyPeriod, function(req, res) {
    res.send(req.showApplyPeriod);
});

module.exports = router;
