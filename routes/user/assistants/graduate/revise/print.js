const request = require('request');
let print = {};

print.processPrint = function(req, res, next){

  if(req.session.profile){
      let courseResult = res.locals.courseResult;
      for(let i = 0; i<courseResult[4].course.length; i++){
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
