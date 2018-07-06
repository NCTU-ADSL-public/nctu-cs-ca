var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/students/projectPage',csrfProtection, function(req, res){

    if(req.session.profile){ 
//       var content ={student_id:req.body.student_id,tname: req.body.tname,research_title:req.body.research_title ,first_second: req.body.first_second};
        
       // var content ={student_id:'0416008',tname: '彭文志',research_title:'0416008' ,first_second: '1'};
        
//		console.log(req.body.student_id);
		query.showResearchPage(req.body.id,function(err,result){
	
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
