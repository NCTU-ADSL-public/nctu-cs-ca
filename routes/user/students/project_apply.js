var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/students/project_apply',csrfProtection, function(req, res, next){

    if(req.session.profile){ 
        
		var success=0;
		var state_info=[];
		
		for(var i = 0;i<req.body.student_num; i++)
		{
			//console.log(req.body.student_num);
			var count=0;
			query.researchApplyFormPersonalReturn(req.body.participants[i],function(err,result){
			if(err)
			{
				throw err;
				res.redirect('/');
			}
			if(!result)
				res.redirect('/');
			
			result = JSON.parse(result);
			count +=1;

			for(var j =0; j<result.length;j++)
			{
				
				if(result[j].agree != '1' )
				{
					//console.log("result:"+result);
					
					success = 0;
					break;
				}
				else 
					success = 1;					
			}
			if(result.length == 0)
				success =1;
			
			if(success ==0)
			{
				state_info.push(0);				
				
			}
			else if(success == 1)
			{
				state_info.push(1);	
			}
			if(count == req.body.student_num)
			{
				
				for(var k=0; k< count;k++)
				{

					if(state_info[k]==0)
					{

						var signal = {signal : 0};
						res.send(signal);
						break;
					}
					
					if((k == count -1)&&(state_info[k])==1)
					{
						for(var m = 0; m<req.body.student_num; m++)
							{
								
								var Student_info = {phone : req.body.phones[m], student_id : req.body.participants[m], research_title : req.body.research_title, tname : req.body.tname,first_second : req.body.first_second, email : req.body.email[m], semester: req.body.semester};
								
								//result = JSON.parse(Student_info);
							
								query.researchApplyFormCreate(Student_info,function(err){
									if(err){
										throw err;
										res.redirect('/');
									}
									
									
								});
											
							}
						var signal = {signal : 1};	
						res.send(signal);
					}
					
				}
			}
						
			}); 
			
			
		}
		
    }
	else
         res.redirect('/');

});

module.exports = router;
