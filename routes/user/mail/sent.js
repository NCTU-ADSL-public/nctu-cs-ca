var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


//console.log(Name);
router.post('/mail/sent', csrfProtection, function(req, res){

    if(req.session.profile){ 
        
        query.mailReturnSendList(req.body.id, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            result = JSON.parse(result);
            //console.log(result);
			res.send(result);
            
        });
	
   }
	else
        res.redirect('/');

});

module.exports = router;
