const request = require('request');
var utils = require('../../../../../utils');
var print = {};

print.processPrint = function(req, res, next){
	
  if(req.session.profile){
      
      var studentId = utils.getPersonId(JSON.parse(req.session.profile));
      var temp = parseInt(studentId.substring(0,2));
      var school_year = (100 + temp);
      var courseResult = res.locals.courseResult;
      var pass = JSON.parse(req.pass);
      var free = res.locals.free;
      var detail = [];

      for(var i = 0; i<pass.length; i++){
		detail[pass[i].cos_cname] = pass[i];
      }
      for(var i = 0; i<courseResult[4].course.length; i++){
          
	  for(var s = 0; s<courseResult[0].course.length; s++){
		if(courseResult[4].course[i].cn == courseResult[0].course[s].cn){
			var temp = courseResult[0].course[s].cn;
			courseResult[0].course.splice(s,1);
			var cosInfo = {
                            	cn:'',
                                en:'',
                                score: -1,
                                code:'',
                                realCredit: 0,
                                originalCredit: 0,
                                complete:true,
                                grade:'0',
                                english: false,
                                year:'',
                                semester:'',
                                reason: 'notCS',
                                move: false
                        };
			cosInfo.cn = detail[temp].cos_cname;
			cosInfo.en = detail[temp].cos_ename;
			cosInfo.score = parseInt(detail[temp].score);
			cosInfo.code = detail[temp].cos_code;
			cosInfo.grade = detail[temp].score_level;
                        cosInfo.year = parseInt(detail[temp].year) - school_year + 1;
                        cosInfo.semester = parseInt(detail[temp].semester);
			cosInfo.realCredit = parseInt(detail[temp].cos_credit);
			cosInfo.originalCredit = parseInt(detail[temp].cos_credit);
			console.log(cosInfo);
			courseResult[0].course.push(cosInfo);
			break;
	  	}
	  }
	  courseResult[4].course[i].cn = '';
          courseResult[4].course[i].en = '';
	  courseResult[4].course[i].realCredit = '';
	  courseResult[4].course[i].originalCredit = '';
	  courseResult[4].course[i].score = '';	 
      }

      res.locals.courseResult = courseResult;
  }
  else
      res.redirect('/');
  res.locals.courseResult = courseResult;
  next();

}


exports.print = print;

