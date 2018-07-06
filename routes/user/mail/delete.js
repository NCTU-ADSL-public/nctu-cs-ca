var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/mail/delete', csrfProtection, function(req, res){

    if(req.session.profile){ 
        
        query.mailDelete(req.body.mail_id);
	
    }
	else
         res.redirect('/');

});

module.exports = router;
