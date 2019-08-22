var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var utils = require('../../../utils');
var csrf = require('csurf');

var getStudentId = require('../common/handler/getStudentId');
var StudentId = getStudentId.getStudentId.studentId;
router.get('/students/profile',StudentId, function(req, res){

    if(req.session.profile){
        
	var personStatus = JSON.parse(req.session.profile).personStatus;
	if(personStatus === 's' || personStatus === 'w' || personStatus ==='a'){
		var studentId = res.locals.studentId;

        	if(!studentId){
              		//////console.log("No Student Id");
              		return;
        	}
        	query.ShowUserInfo(studentId, function(err,result){
            		if(err){
                		//////console.log("Can't find student");
                		throw err;
                		return;
            		}
            		if(!result){
                		return;
           	 	}
            		//////console.log("profile in profile:");
            		//////console.log(result);
	    		//req.session.profile = result;
	    		res.send(result);
	    		//query.close();
        	});
	}
	else
		res.redirect('/');
    }
    else{
        res.redirect('/');
	return;
    }

});

module.exports = router;

