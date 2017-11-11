const request = require('request');
var print = {};

print.processPrint = function(req, res, next){

  if(req.session.profile){
      var courseResult = res.locals.courseResult;
      for(var i = 0; i<courseResult[4].course.length; i++){
          courseResult[4].course[i].cn = '';
          courseResult[4].course[i].en = '';
      }
      res.locals.courseResult = courseResult;
  }
  else
      res.redirect('/');
  res.locals.courseResult = courseResult;
  next();

}


exports.print = print;
