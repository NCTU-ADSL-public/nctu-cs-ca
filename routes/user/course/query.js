const request = require('request');
var table = require('./table');
var utils = require('../../../utils');
var query = {};
//query students' profile
query.queryProfile = function(req, res, next){
    if(req.session.profile && res.locals.studentId){
        var studentId = res.locals.studentId;
        if(!studentId){
            //console.log("No student Id");
            return;
        }
        else{
            table.tables.getProfile(studentId,function(profile){
                req.profile = profile;
                if(req.profile)
                    next();
                else{
                    //console.log("Cannot get profile");
                    return;   
                } 
            });
        }
    }
}
//query students' pass course
query.queryPass = function(req, res, next){
   if(req.session.profile && res.locals.studentId){
	 var studentId = res.locals.studentId;
         if(!studentId){
         	    //console.log("No Student Id in queryPass");
                return;
         }
         else{
           	table.tables.getPass(studentId,function(pass){
                req.pass = pass;
		        if(req.pass)
                  next();
                else{
                  //console.log("Cannot get pass");
                  return;
                }
            });
         }
    }
    else {
        res.redirect('/');
    }
}
//query course in cs table
query.queryCourse = function(req, res, next){
    if(req.session.profile && res.locals.studentId){
    	var studentId = res.locals.studentId;
  		if(!studentId){
  			//console.log("No Student Id in queryCourse");
  			return;
  	  	}
      		else{
        		table.tables.getCourse(studentId, function(course){
          			req.course = course;
	  			if(req.course)
            				next();
          			else{
              				//console.log("Cannot get course");
              				return;
          			}
        		});
      		}
    }
    else {
      		res.redirect('/');
    }
}
//query curricular rules
query.queryRule = function(req, res, next){
    if(req.session.profile && res.locals.studentId){
         var studentId = res.locals.studentId;
                if(!studentId){
                        //console.log("No Student Id in queryRule");
                        return;
                }
                else{
                     table.tables.getRule(studentId,function(rules){
                          req.rules = rules;
			  if(req.rules)
                             next();
                          else{
                             //console.log("Cannot get rules");
                             return;
                          }
                     });
                }
     }
     else{
       res.redirect('/');
     }
}
//query courses that students' want to waive
query.queryFree = function(req, res, next){
    if(req.session.profile){
         var studentId = res.locals.studentId; 
                if(!studentId){
                        //console.log("No Student Id in queryFree");
                        return;
                }
                else{     
		                table.tables.getFree(studentId,function(free){
                                req.free = free;
                                if(req.free)
                                        next();
                                else{
                                        //////console.log("Cannot get free course");
                                        return;
                                }
                        });
                }
     }
     else{
       res.redirect('/');
     }
}
//query courses that students take this semester
query.queryNow = function(req, res, next){
    if(req.session.profile){
         var studentId = res.locals.studentId;
                if(!studentId){
                        //console.log("No Student Id in queryNow");
                        return;
                }
                else{
                     table.tables.getNow(studentId,function(now){
                          req.now = now;
                          if(req.now)
                             next();
                          else{
                             //console.log("Cannot get current course");
                             return;
                          }
                     });
                }
     }
     else{
       res.redirect('/');
     }
}
//query courses that could be taken as general courses
query.queryGeneral = function(req, res, next){
    if(req.session.profile){
    	table.tables.getGeneral(function(general){
        	req.general = general;
                if(req.general)
                	next();
                else{
                        //console.log("Cannot get general courses");
                        return;
                }
        });
     }
     else{
       res.redirect('/');
     }
}
//query courses that are changed by students
query.queryChange = function(req, res, next){
    if(req.session.profile){
        var studentId = res.locals.studentId;
        table.tables.getChange(studentId, function(change){
            req.changeCourses = change;
            if(req.changeCourses)
                next();
            else{
                //console.log("Cannot get changed courses");
                return;
            }
        });
    }
    else
        res.redirect('/');
}
//query the project the student do
query.queryProject = function(req, res, next){
    if(req.session.profile){
        var studentId = res.locals.studentId;
        table.tables.getProject(studentId, function(project){
            req.project = project;
            if(req.project)
                next();
            else
                return;
        });
    }
    else
        res.redirect('/');
}
//query the project number the teacher have
query.queryProjectNum = function(req, res, next){
    if(req.session.profile){
		var studentId = res.locals.studentId;
		//console.log(studentId);
        table.tables.getProjectNum(studentId, function(projectNum){
            req.projectNum = projectNum;
            if(req.projectNum)
                next();
            else
                return;
        });
    }
    else
        res.redirect('/');
}
exports.query = query;
