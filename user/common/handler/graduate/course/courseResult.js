const request = require('request');
var utils = require('../../../../../../utils');
var courseResult = {};
courseResult.processResult = function(req, res, next){
        var result = {
                total: 0,
                total_require: 128,
                compulsory: 0,
                compulse_require: 58,
                pro: 0,
                pro_require: 0,
                english: 0,
                english_require: 1,
                other: 0,
                other_require: 0,
                general: 0,
                general_require: 20,
                general_new: 0,
                general_new_require: 22,
                pe: 0,
                pe_require: 6,
                language: 0,
                language_require: 8,
                service: 0,
                service_require: 2,
                art: 0,
                art_require: 2,
                graduate: 0,
                dmajor_minor_program: 0
        }
  	if(req.session.profile){
  		var rules = JSON.parse(req.rules);
          //   console.log(rules);  	
            var CourseResult = res.locals.courseResult;
  		//console.log(CourseResult[0].course);
  		var EnglishCourse = res.locals.English;
          	result.compulsory = parseFloat(CourseResult[0].credit);
            result.compulsory = result.compulsory.toFixed(1);

            result.compulse_require = rules[0].require_credit; 	
           // result.compulse_require = result.compulse_require.toFixed(1);

          	result.pro = parseFloat(CourseResult[1].credit);
            result.pro = result.pro.toFixed(1);

          	result.pro_require = rules[0].pro_credit;
            //result.pro_require = result.pro_require.toFixed(1);

  		    result.english = EnglishCourse.length;

          	result.other = parseFloat(CourseResult[2].credit);
            result.other = result.other.toFixed(1);

          	result.other_require = rules[0].free_credit;
            //result.other_require = result.other_require.toFixed(1);

          	result.language = parseFloat(CourseResult[3].credit);
            result.language = result.language.toFixed(1);

          	result.general = parseFloat(CourseResult[4].credit);
            result.general = result.general.toFixed(1);

            result.general_new = parseFloat(CourseResult[5].credit.total);
            result.general_new = result.general_new.toFixed(1);


          	result.pe = CourseResult[6].course.length;

            result.graduate = CourseResult[9].credit;
            result.graduate = result.graduate.toFixed(1);

            result.dmajor_minor_program = CourseResult[10].credit;
            result.dmajor_minor_program = result.dmajor_minor_program.toFixed(1);

            for(var i = 0; i<CourseResult[6].course.length; i++){
              if(CourseResult[6].course[i].reason == 'now')
                  result.pe--;
            }
          	result.service = CourseResult[7].course.length;
            for(var i = 0; i<CourseResult[7].course.length; i++){
                 if(CourseResult[7].course[i].reason == 'now')
                     result.service --;
            }
          	result.art = CourseResult[8].course.length;
            for(var i = 0; i<CourseResult[8].course.length; i++){
                if(CourseResult[8].course[i].reason == 'now')
                    result.art--; 
            }    
          	for(var i = 0; i<CourseResult.length; i++){
                  if((typeof(CourseResult[i].credit) != undefined) && (CourseResult[i].credit))
                  	if(i != 10 && i != 9 && i != 5){
                        result.total += CourseResult[i].credit;
                    }
                  //else
                    //  console.log(res.locals.studentId + " : " + CourseResult[i].title);
            }
            
            result.total = parseFloat(result.total);
            result.total = result.total.toFixed(1);

  		CourseResult.push(result);
  	}
  	else {
      		res.redirect('/');
  	}
	res.locals.courseResult = CourseResult;
	next();
}

exports.courseResult = courseResult;
