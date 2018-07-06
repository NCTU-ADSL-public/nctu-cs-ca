var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/students/editProject',csrfProtection, function(req, res){

    if(req.session.profile){ 
        
		
		var req_member = {tname:req.body.tname, research_title: req.body.research_title, first_second:req.body.first_second, semester:req.body.semester};
		query.findResearchGroup(req_member,function(err,result){
		if(err)
		{
			throw err;
			res.redirect('/');
		}
		if(!result)
			res.redirect('/');
		
		result = JSON.parse(result);
		//res.send(result);
		var set_project = {/*student_id : '', */tname: req.body.tname, research_title :req.body.research_title, first_second:req.body.first_second,semester:req.body.semester,  new_title : req.body.new_title, new_link: req.body.new_link, new_intro:req.body.new_intro};
		//for(var j =0; j<result.length;j++)
		//{
			//console.log(result[j]);
			//set_project.student_id = result[j].student_id;
			//console.log(set_project);
			query.setResearchPage( set_project, function(err){
				if(err){
						throw err;
						res.redirect('/');
				}

			});
								
		//}
			var signal = {signal : 1};
			res.send(signal	);
		}); 
			
		
    }
	else
         res.redirect('/');

});

module.exports = router;
