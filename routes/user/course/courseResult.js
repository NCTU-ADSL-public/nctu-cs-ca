const request = require('request');
var utils = require('../../../utils');
var courseResult = {};
courseResult.processResult = function(req, res, next){
        var result = {
                total: 0,
                total_require: 128,
                compulsory: 0,
                compulse_require: 58,
                core: 0,
                core_require: 0,
                vice: 0,
                vice_require: 0,
                pro: 0,
                pro_require: 0,
                english: 0,
                english_require: 1,
                other: 0,
                other_require: 0,
                general: 0,
                general_require: 20,
                pe: 0,
                pe_require: 6,
                language: 0,
                language_require: 8,
                service: 0,
                service_require: 2,
                art: 0,
                art_require: 2
        }
  	if(req.session.profile){
  		var rules = JSON.parse(req.rules);
          	var CourseResult = res.locals.courseResult;
  		////console.log(CourseResult[0].course);
  		var EnglishCourse = res.locals.English;
          	result.compulsory = CourseResult[0].credit;
          	result.core =  CourseResult[1].credit;
          	result.core_require = parseInt(rules[0].core_credit);
          	result.vice = CourseResult[2].credit;
          	result.vice_require = parseInt(rules[0].sub_core_credit);
          	result.pro = CourseResult[3].credit;
          	result.pro_require = parseInt(rules[0].pro_credit);
  		result.english = EnglishCourse.length;
          	result.other = CourseResult[4].credit;
          	result.other_require = parseInt(rules[0].free_credit);
          	result.language = CourseResult[5].credit;
          	result.general = CourseResult[6].credit;
          	result.pe = CourseResult[7].course.length;
          	result.service = CourseResult[8].course.length;
          	result.art = CourseResult[9].course.length;
          	for(var i = 0; i<CourseResult.length; i++)
                  	result.total += CourseResult[i].credit;

  		CourseResult.push(result);
  	}
  	else {
      		res.redirect('/');
  	}
	res.locals.courseResult = CourseResult;
	next();
}

exports.courseResult = courseResult;
