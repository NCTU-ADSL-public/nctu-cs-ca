var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/mail/content', csrfProtection, function(req, res){

    if(req.session.profile){ 
        
       // console.log(req.body.mail_id);
        query.mailReturnSingle(req.body.mail_id, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            result = JSON.parse(result);
         //   console.log(result);
			res.send(result);
            
        });
	
    }
	else
         res.redirect('/');

});

module.exports = router;
