var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/professors/students/researchInfo',csrfProtection, function(req, res){

    if(req.session.profile){ 
        
		var Info = {research_title : req.body.research_title, tname : req.body.tname, first_second : req.body.first_second, semester:req.body.year};
		query.showResearchInfo(Info, function(err,result){
	
			if(err)
			{
				throw err;
				res.redirect('/');
			}
			if(!result)
				res.redirect('/');
			
			result = JSON.parse(result);
			//console.log(result.length);
			res.send(result);
		
					
		});		
		
    }
	else
        res.redirect('/');

});

module.exports = router;
