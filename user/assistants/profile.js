var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var utils = require('../../../utils');
var csrf = require('csurf');

var csrfProtection = csrf();

router.get('/assistants/profile', csrfProtection, function(req, res){

    if(req.session.profile){
        
	var personStatus = JSON.parse(req.session.profile).personStatus;
	//if(personStatus == 'a'){
		var assistantId = utils.getPersonId(JSON.parse(req.session.profile));

        	if(!assistantId){
              		//console.log("No Student Id");
              		return;
        	}
        	query.ShowUserInfo(assistantId, function(err,result){
            		if(err){
                		//console.log("Can't find student");
                		throw err;
                		return;
            		}
            		if(!result){
                		return;
            		}
            		//console.log("profile in profile:");
            		//console.log(result);
	    		//req.session.profile = result;
	    		res.send(result);
	   		 //query.close();
        	});
	//}
	//else
		//res.redirect('/');
    }
    else{
        res.redirect('/');
	return;
    }

});

module.exports = router;

