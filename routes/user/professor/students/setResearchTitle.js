var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/professors/students/setResearchTitle',csrfProtection, function(req, res){

    if(req.session.profile){ 
        
		var Info = {research_title : req.body.research_title, tname : req.body.tname, first_second : req.body.first_second, semester:req.body.year, new_title : req.body.new_title};
	    
       // console.log(Info);
    	query.updateResearchTitle(Info);
		
		var signal = {signal:1};
		res.send(signal);		
		
    }
	else
        res.redirect('/');

});

module.exports = router;
