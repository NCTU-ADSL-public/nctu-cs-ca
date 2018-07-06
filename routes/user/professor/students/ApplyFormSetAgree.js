var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/professors/students/ApplyFormSetAgree', csrfProtection, function(req, res){

    if(req.session.profile){ 
        
		//var formInfo = {research_title : '0416008', tname : '彭文志', agree :'1'};
		
		
		if(req.body.agree =='1')
  		{
  			
			
	//var req_member = {student_id :'0416008', tname : '彭文志', research_title : '0416008', first_second:1};
	//console.log(req_member);
			for(var i = 0; i<req.body.student.length;i++)
			{
				var req_member = { student_id : req.body.student[i].student_id,tname : req.body.tname, research_title :  req.body.research_title, first_second:req.body.first_second, semester:req.body.year/*'106-2'*/};
				//console.log(req_member);
				query.createNewResearch(req_member, function(err){
  				if(err){
  						throw err;
  						res.redirect('/');
  				}
  				
				
				});
						
			}
			var formInfo = {research_title :  req.body.research_title, tname : req.body.tname, first_second:req.body.first_second, agree :req.body.agree, semester: req.body.year/*'106-2'*/};
		   // console.log(formInfo);	
			query.researchApplyFormSetAgree(formInfo);
			
			var signal = {signal : 1};
			res.send(signal	);
				
		}
		else
		{
			var formInfo = {research_title :  req.body.research_title, tname : req.body.tname,first_second:req.body.first_second, agree :req.body.agree, semester: req.body.year/*'106-2'*/};
			
			query.researchApplyFormSetAgree(formInfo);
			
			var signal = {signal : 1};
			res.send(signal	);
			
		}
		
		
		
    }
	else
      res.redirect('/');

});

module.exports = router;
