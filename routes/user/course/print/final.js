var utils = require('../../../../utils');
var finalProcess = {};

finalProcess.processFinal = function(req, res, next){

	if(req.session.profile){
		var courseResult = res.locals.courseResult;
		if(courseResult[6].credit < courseResult[6].require){
			for(var i = 0; i<courseResult[4].course.length; i++){
				if(courseResult[4].course[i].reason == 'general'){
					courseResult[6].course.push(courseResult[4].course[i]);
					courseResult[6].credit += parseInt(courseResult[4].course[i].credit);
					courseResult[4].course.splice(i,1);
					courseResult[4].credit -= parseInt(courseResult[4].course[i].credit);
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
