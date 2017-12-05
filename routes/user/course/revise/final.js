var utils = require('../../../../utils');
var finalProcess = {};

finalProcess.processFinal = function(req, res, next){

	if(req.session.profile){
		var courseResult = res.locals.courseResult;
        ////console.log(courseResult[6]);
        var dimension = res.locals.dimension;
        var dimension_count = 0;
        var incomplete = [];
        for(var s = 0; s<6; s++){
            if(dimension[s] != true){
                if(s == 0)
                    incomplete['當代'] = true;
                else if(s == 1)
                    incomplete['公民'] = true;
                else if(s == 2)
                    incomplete['群己'] = true;
                else if(s == 3)
                    incomplete['文化'] = true;
                else if(s == 4)
                    incomplete['歷史'] = true;
                else if(s == 5)
                    incomplete['自然'] = true; 
            }
            else
                dimension_count++;
        }
        //check if all dimension have taken once
		if(dimension_count != 6){
			for(var i = 0; i<courseResult[4].course.length; i++){
				if(courseResult[4].course[i].reason == 'general'){
                    if(incomplete[courseResult[4].course[i].dimension] == true){     
                        courseResult[6].course.push(courseResult[4].course[i]);
					    courseResult[6].credit += courseResult[4].course[i].realCredit;
					    courseResult[4].credit -= courseResult[4].course[i].realCredit;
                        incomplete[courseResult[4].course[i].dimension] == false;
                        courseResult[4].course.splice(i,1);
                    }
				}
			}
		}
        //then check if the credit is enough
        if(courseResult[6].credit < courseResult[6].require){
            for(var i = 0; i<courseResult[4].course.length; i++){
                if(courseResult[4].course[i].reason == 'general'){
                    courseResult[6].course.push(courseResult[4].course[i]);
                    courseResult[6].credit += courseResult[4].course[i].realCredit;
                    courseResult[4].credit -= courseResult[4].course[i].realCredit;
                    courseResult[4].course.splice(i,1);
                }
            }
        }
	}
	else
		res.redirect('/');	
	res.locals.courseResult = courseResult;
	next();

}


exports.finalProcess = finalProcess;
