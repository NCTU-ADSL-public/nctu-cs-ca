var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var table = require('./handler/table');


var researchSetScore = table.table.researchSetScore;
var researchSetTitle = table.table.researchSetTitle;
var researchList = table.table.researchList;
var researchSetReplace = table.table.researchSetReplace;

router.post('/professors/research/setScore' , csrfProtection, researchSetScore, function(req, res){
    res.send(req.setScore);
});

router.post('/professors/research/setTitle',csrfProtection, researchSetTitle, function(req, res){

	res.send(req.setTitle);		
});
router.post('/professors/research/list',csrfProtection, researchList, function(req, res){
    res.send(req.list);
});
router.post('/professors/research/setReplace', csrfProtection, researchSetReplace, function(req, res) {
    res.send(req.reply);
});
module.exports = router;
