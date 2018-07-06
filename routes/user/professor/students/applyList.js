var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var getTeacherId = require('../../course/getTeacherId');

var TeacherId = getTeacherId.getTeacherId.teacherId;

router.get('/professors/students/applyList', TeacherId, function(req, res){

    if(req.session.profile){ 
        
	    var teacherId = res.locals.teacherId;
    	query.researchApplyFormTeaReturn(teacherId, function(err,result){
			if(err)
                {
                      throw err;     
                      res.redirect('/');
                }

                if(!result)
                     res.redirect('/'); 
			    
                result = JSON.parse(result);	
                if(result.length == 0){
                    var groups = [];
                    //console.log("no groups")
                }
                else{ 
               //  console.log(result);
               // result = JSON.parse(result);
				var temp = result[0].research_title;
				var groups =  [];
				var project = {
					research_title: '',
                    first_second:'',
					participants: [],
                    year: '',
                    status:''
				}
				project.research_title = temp;
                //project.status = result[i].agree;
				for(var i = 0; i<result.length; i++){
					if(result[i].agree == 3)
						continue;
					var student = {
						student_id: '',
						sname: '',
						email: '',
						phone: '',
                        state: '',
                        year: '',
                        first_second:''
					}
					student.student_id = result[i].student_id;
					student.sname = result[i].sname;
					student.email = result[i].email;
					student.phone = result[i].phone;
		            student.state = result[i].agree;
                   // console.log("yy:"+result[i].first_second);
                    student.first_second = result[i].first_second;
				    student.year = result[i].semester;
             //       console.log(result[i].semester)
                	if(result[i].research_title == temp)
					{
						project.participants.push(student);
						if(i == result.length - 1)
						{   
                           
						   // project.status = result[i].agree;
                           project.status = project.participants[0].state;
                           project.first_second = project.participants[0].first_second;
                           project.year = project.participants[0].year; 
                            groups.push(project);
						}
					}
					else{
                
                       // project.status = result[i-1].agree;
                       project.first_second = project.participants[0].first_second;
                       project.status = project.participants[0].state;
                       project.year = project.participants[0].year;
                        groups.push(project);
						temp = result[i].research_title;
						var new_project = {
							research_title: '',
                            first_second:'',
							participants: [],
                            year:'',
                            status:''
						}
						new_project.research_title = result[i].research_title;
						new_project.participants.push(student);
                    	project = new_project;
						if(i == result.length - 1)
						{
                        

                         //   project.status = result[i].agree;
                            project.status = project.participants[0].state;
                            project.first_second = project.participants[0].first_second;
                            project.year = project.participants[0].year;
                            groups.push(project);
						}
							
					}
					
						
	
				}
	           // console.log("groups:"+groups[0].first_second);	
                }
                
                res.send(groups) ;   
       
        });
		
	
    }
	else
        res.redirect('/');

});

module.exports = router;
