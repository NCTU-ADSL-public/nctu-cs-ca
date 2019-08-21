const request = require('request');
var query = require('../../../db/msql');
var utils = require('../../../utils');
var randoms = require('../../../randomVals');
var methods = {};

var url = "https://id.nctu.edu.tw/o/authorize/?client_id=QkP1fSywwMdJ3i6boO3jw2F7SfZiutyc6tihAvK6&response_type=code&scope=profile%20name";
var redirectPath = utils.redirectPath;
var oAuthNctu = {
    grant_type : "authorization_code",
    client_id : "QkP1fSywwMdJ3i6boO3jw2F7SfZiutyc6tihAvK6",
    client_secret : randoms.randomVals.nctuClientKey,
    redirect_uri : "http://140.113.17.22:1234/auth/Nctu/callback"
}

exports.oAuthNctu = oAuthNctu;

methods.getCode = function(req, res, next){
    oAuthNctu.code = req.query.code;
    console.log( oAuthNctu.code)
    if(!oAuthNctu.code){
        //console.log("Did not recieve code.");
        res.redirect('/');
        return;
   }
    console.log("token:");
   // console.log(oAuthNctu.code);
    next();
}

methods.getToken = function(req, res, next){
    var formData = {
        grant_type : oAuthNctu.grant_type,
        code : oAuthNctu.code,
        client_id : oAuthNctu.client_id,
        client_secret : oAuthNctu.client_secret,
        redirect_uri : oAuthNctu.redirect_uri
    };
    request({
        uri: 'https://id.nctu.edu.tw/o/token/',
        method: "POST",
        headers: {
           'Content-Type': 'multipart/form-data'
        },
        formData: formData
        }, function(err, res, body){
            if(body == '{"error": "invalid_grant"}'){
                //console.log("invalid code!");
                return;
            }
            var bodyObj = JSON.parse(body);
            var access_token = bodyObj.access_token;
	   // console.log("Token:" + access_token);
            oAuthNctu.token = access_token;
            next();
        });
}

methods.getProfile = function(req, res, next){
    request({
        uri: 'https://id.nctu.edu.tw/api/profile/',
        method: "GET",
        headers: {
          'Authorization' : 'Bearer ' + oAuthNctu.token,
    },}, function(err, res, body){
        if(body == '<h1>Server Error (500)</h1>'){
            console.log("invalid token!!");
            return;
        }
	//console.log("Profile:" + body);
	req.session.profile = body;
	body = JSON.parse(body);
	//console.log("req.sesision:" + req.session.profile);
	////console.log("req only ID:" + req.session.profile);
	//console.log("Profile username: " + body);
	if(body){
		var studentId = body.username;
        	var email = body.email;
		query.SetUserEmail(studentId, email);
	}
        next();
   });
}

methods.redirectAfterAuth = function(req, res, next){
        
      if(req.session.profile){
            var personId = utils.getPersonId(JSON.parse(req.session.profile));
            if(!personId){
                //console.log("no student id");
                return;
            }
            query.ShowUserInfo(personId, function(err, result){
		//console.log(result);
                if(!result){
                    return;
                }
		
                if(err){
                    //console.log("Can't find this person");
                    throw err;
                    return;
                }
		if(result == '[]'){
		    var temp = JSON.parse(result);
                    var profileObj = JSON.parse(req.session.profile);
                    profileObj.personStatus = '!';
                    req.session.profile = JSON.stringify(profileObj);
            	    next();
		}
		else{
                   // console.log(result);
                    var temp = JSON.parse(result);
		    var profileObj = JSON.parse(req.session.profile);
                    profileObj.personStatus = temp[0].status;
		    req.session.profile = JSON.stringify(profileObj);
		    next();
		}
            });
         }    
        else
	    next();
}

methods.redirectPath = function(req, res, next){
    console.log(req.session.profile); 
    var personStatus = JSON.parse(req.session.profile).personStatus;
    switch(personStatus){
        case 'w':
            //console.log("This is a student");
            res.redirect('/students/head');
        case 's':
            //console.log("This is a student");
            res.redirect('/students/head');
            break;
        case 'p':
            //console.log("This is a professor");
            res.redirect('/teachers/head');
            break;
        case 'a':
            //console.log("This is an assistant");
            res.redirect('/assistants/head');
            break;
	case '!':
	    res.redirect('/');
	    break;
    }
}

exports.method = methods;
