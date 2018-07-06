var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


//console.log(Name);
router.post('/mail/readSet' , csrfProtection, function(req, res){

//console.log(StudentId);
   if(req.session.profile){
        
        
         var mailContent = {mail_id : req.body.mail_id , read_bit :req.body.read_bit};
           // console.log(mailContent);
         query.mailReadSet(mailContent);
        
    }
    else
      res.redirect('/');

});

module.exports = router;