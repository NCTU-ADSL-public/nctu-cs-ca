var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


//console.log(Name);
router.get('/mail/getStudentList', function(req, res){

    if(req.session.profile){ 
        
        query.returnStudentIdList(function(err, result){
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
