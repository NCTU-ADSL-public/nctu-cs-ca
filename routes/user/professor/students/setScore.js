var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/professors/students/setScore' , csrfProtection, function(req, res){


   if(req.session.profile){
        
        
         var content = {student_id:req.body.student_id,tname:req.body.tname, research_title:req.body.research_title, first_second: req.body.first_second, semester:req.body.year/*'106-2'*/, new_score:req.body.new_score,new_comment:req.body.comment };
//          var content = {student_id:'0416008',tname:'彭文志', research_title:'0416008', first_second: '1', new_score:'9898'};
          //  console.log(req.body);
            //console.log(req.body.student_id);
	        //console.log(req.body.first_second);
            query.setResearchScoreComment(content);
  
            var signal = {signal:1};

            res.send(signal);
                  
    }
    else
      res.redirect('/');

});

module.exports = router;
