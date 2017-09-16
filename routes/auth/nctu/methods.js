const request = require('request');
var methods = {};

var url = "https://id.nctu.edu.tw/o/authorize/?client_id=p6twozVJk4nRwNE5A2mLKT7uzvWeedr6GOL6LXz8&response_type=code&scope=profile%20name";

var oAuthNctu = {
    grant_type : "authorization_code",
    client_id : "p6twozVJk4nRwNE5A2mLKT7uzvWeedr6GOL6LXz8",
    client_secret : "HaHg33B3le8SMhAIUBR2XLw5od4kj4OClk10UYlpY4cBtMUi0NkBNPiarF9AtGlTpxgvNGTfyCEB9MtrubE7t3WjJ5gE5VCX2Z8trMdzE30H8EL8CPUSALWwF3NYBwLd",
    redirect_uri : "http://csca.nctu.edu.tw/auth/Nctu/callback"
}


methods.getCode = function(req, res, next){
    oAuthNctu.code = req.query.code;
    if(!oAuthNctu.code){
        console.log("Did not recieve code.");
        res.redirect('/');
        return;
    }
    console.log(oAuthNctu.code);
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
                console.log("invalid code!");
                return;
            }
            var bodyObj = JSON.parse(body);
            var access_token = bodyObj.access_token;
	    console.log("Token:" + access_token);
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
	console.log("Profile:" + body);
        req.session.profile = body;
        next();
   });
}

methods.redirectAfterAuth = function(req, res){
        res.redirect('/Head');
}

exports.method = methods;
