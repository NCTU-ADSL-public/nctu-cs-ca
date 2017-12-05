var utils = require('../../../../utils');
var print = {};

print.processPrint = function(req, res, next){
	
  if(req.session.profile){
          
      var studentId = res.locals.studentId;
      var temp = parseInt(studentId.substring(0,2));
      var school_year = (100 + temp);
      var courseResult = res.locals.courseResult;
      var pass = JSON.parse(req.pass);
      var free = res.locals.free;
      var detail = [];

      for(var i = 0; i<pass.length; i++){
		detail[pass[i].cos_cname] = pass[i];
      }
      /*for(var i = 0; i<free.length; i++){
	    for(var s = 0; s<courseResult[0].course.length; s++){
		    if(free[i].cn == courseResult[0].course[s].cn){
			    var cosInfo = JSON.stringify(free[i]);
                cosInfo = JSON.parse(cosInfo);
                cosInfo.cn = '';
                cosInfo.en = '';
                cosInfo.realCredit = 0;
                courseResult[0].course.splice(s,1);
			    courseResult[0].course.push(cosInfo);
			    break;
	  	    }   
	    }
      }*/

      /*for(var i = 0; i<courseResult[4].course.length; i++){
        courseResult[4].course[i].reason = '';
        courseResult[4].course[i].cn = '';
        courseResult[4].course[i].en = '';
        courseResult[4].course[i].realCredit = '';
        courseResult[4].course[i].originalCredit = '';
        courseResult[4].course[i].score = ''; 
      }*/

      for(var q=0; q<3; q++){
            var cosInfo = {
                    cn:'',
                    en:'',
                    score:-1,
                    code:'',
                    realCredit:'',
                    originalCredit:'',
                    grade:'',
                    english:'',
                    year:'',
                    semester:'',
                    reason:'',
                    move:''
            }
            courseResult[3].course.push(cosInfo);
            courseResult[5].course.push(cosInfo);
            courseResult[4].course.push(cosInfo);
      }
      res.locals.courseResult = courseResult;
  }
  else
      res.redirect('/');
  res.locals.courseResult = courseResult;
  next();

}


exports.print = print;

