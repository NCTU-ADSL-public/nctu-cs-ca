var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var utils = require('../../../utils');
var csrf = require('csurf');
var csrfProtection = csrf();
var getTeacherId = require('../common/handler/getTeacherId');

var TeacherId = getTeacherId.getTeacherId.teacherId;

router.get('/professors/profile', TeacherId, function(req, res){

    if(req.session.profile){
        
	var personStatus = JSON.parse(req.session.profile).personStatus;
	//if(personStatus == 'a'){
		//var teacherId = utils.getPersonId(JSON.parse(req.session.profile));
        var teacherId = res.locals.teacherId;
        //var teacherId = 'T9229';
        	if(!teacherId){
              		//console.log("No Student Id");
              		return;
        	}
            //test ID T9229
        	query.ShowUserInfo(teacherId, function(err,result){
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
                //result = JSON.parse(result);
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

