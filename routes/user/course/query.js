const request = require('request');
var table = require('./table');
var utils = require('../../../utils');
var query = {};

query.queryPass = function(req, res, next){
    //console.log("queryPass");
   if(req.session.profile){
	 var studentId = res.locals.studentId;
         if(!studentId){
         	console.log("No Student Id in queryPass");
                return;
         }
         else{
           	table.tables.getPass(studentId,function(pass){
                req.pass = pass;
		if(req.pass)
                  next();
                else{
                  console.log("Cannot get pass");
                  return;
                }
            });
         }
    }
    else {
        res.redirect('/');
    }
}

query.queryCourse = function(req, res, next){

    if(req.session.profile){
    	var studentId = res.locals.studentId;
  		//var program = req.profile[0].program;
  		if(!studentId){
  			console.log("No Student Id in queryCourse");
  			return;
  	  	}
      		else{
        		table.tables.getCourse(studentId, function(course){
          			req.course = course;
	  			if(req.course)
            				next();
          			else{
              				console.log("Cannot get course");
              				return;
          			}
        		});
      		}
    }
    else {
      		res.redirect('/');
    }
}

query.queryRule = function(req, res, next){
    if(req.session.profile){
         var studentId = res.locals.studentId;
                if(!studentId){
                        console.log("No Student Id in queryRule");
                        return;
                }
                else{
                     table.tables.getRule(studentId,function(rules){
                          req.rules = rules;
			  if(req.rules)
                             next();
                          else{
                             console.log("Cannot get rules");
                             return;
                          }
                     });
                }
     }
     else{
       res.redirect('/');
     }
}

query.queryFree = function(req, res, next){
    if(req.session.profile){
         var studentId = res.locals.studentId; 
                if(!studentId){
                        console.log("No Student Id in queryFree");
                        return;
                }
                else{     
		                table.tables.getFree(studentId,function(free){
                                req.free = free;
                                console.log("free!!");
			                    console.log(free);
                                if(req.free)
                                        next();
                                else{
                                        console.log("Cannot get free course");
                                        return;
                                }
                        });
                }
     }
     else{
       res.redirect('/');
     }
}

query.queryNow = function(req, res, next){
    if(req.session.profile){
         var studentId = res.locals.studentId;
                if(!studentId){
                        console.log("No Student Id in queryNow");
                        return;
                }
                else{
                     table.tables.getNow(studentId,function(now){
                          req.now = now;
                          if(req.now)
                             next();
                          else{
                             console.log("Cannot get current course");
                             return;
                          }
                     });
                }
     }
     else{
       res.redirect('/');
     }
}

query.queryGeneral = function(req, res, next){
    if(req.session.profile){
    	table.tables.getGeneral(function(general){
        	req.general = general;
                if(req.general)
                	next();
                else{
                        console.log("Cannot get general courses");
                        return;
                }
        });
     }
     else{
       res.redirect('/');
     }
}

exports.query = query;
