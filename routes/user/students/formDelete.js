var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/students/formDelete', csrfProtection, function(req, res){

    if(req.session.profile){ 
        
		
		var formInfo = {research_title : req.body.research_title, tname : req.body.tname, first_second:req.body.first_second, semester: req.body.semester};
      // console.log(formInfo);
	   // var formInfo = {research_title : '0416008', tname : '彭文志', first_second:'0'};
        
    	//console.log("form:"+ req.body.research_title + req.body.tname);
		query.researchApplyFormDelete(formInfo);
		
		var signal = {signal : 1};
		res.send(signal);	
    }
	else
        res.redirect('/');

});

module.exports = router;
