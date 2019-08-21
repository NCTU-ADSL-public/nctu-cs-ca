var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var getStudentId = require('../common/handler/getStudentId');
var table = require('./handler/table');

var StudentId = getStudentId.getStudentId.studentId;
var researchList = table.table.researchList;
var researchEdit = table.table.researchEdit;
var researchSetReplace = table.table.researchSetReplace;
var researchApplyCreate = table.table.researchApplyCreate;
var researchApplyDelete = table.table.researchApplyDelete;
var researchShowStudentStatus = table.table.researchShowStudentStatus;

router.get('/students/research/list', StudentId, researchList, function(req, res){
	res.send(req.list);
});


router.post('/students/research/edit',csrfProtection,researchEdit, function(req, res){
	res.send(req.edit);
});

router.post('/students/research/setReplace', csrfProtection,researchSetReplace, function(req, res){
    res.send(req.setReplace);
    
});

router.post('/students/research/create',csrfProtection,researchApplyCreate, function(req, res){
	res.send(req.create);

});

router.post('/students/research/delete', csrfProtection,researchApplyDelete, function(req, res){
	res.send(req.delete);	
});

router.post('/students/research/showStudentStatus', csrfProtection,researchShowStudentStatus, function(req, res){
	res.send(req.status);	
});
module.exports = router;
