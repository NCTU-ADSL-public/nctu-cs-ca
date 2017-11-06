const request = require('request');
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var router = express.Router();

router.post('/students/graduate/check',function(req, res){
    console.log("check state:");
    console.log(req.body.check.state);
    var submit = req.body.check.state;
    //var data = { check: { state: false } };

    if(req.session.profile){
        var profile = req.session.profile;
	var studentId;
	if(submit === true){
		changeSubmit(profile, function(studentId){
			console.log("studentId after callback:" + studentId);
		});
		req.profile.graduate_submit = true;
		console.log("in post req.profile");
		console.log(req.profile.graduate_submit);
	}
    }
});

function changeSubmit(profile, callback){
	console.log("in callback studentId");
        console.log(profile);
        var studentId = utils.getPersonId(JSON.parse(profile));
        console.log("studentId: " + studentId);
        callback(studentId);
	query.setStudentGraduateSubmit(studentId,'1');
}

router.get('/students/graduate/check',function(req, res){
    if(req.session.profile){
        console.log("in get req.profile");
        console.log(req.profile[0].graduate_submit);
	var submit = req.profile[0].graduate_submit;
	var data = { check: { state: false } };
	var check = {state: false};
	console.log("in get check");
	console.log(submit);
	if(submit == '1'){
		submit = true;
		check.state = true;
		data.check.state = true;
		console.log(data);
	}
	else
		check.state= false;
	res.send(data);
     }
    
});



module.exports = router;

