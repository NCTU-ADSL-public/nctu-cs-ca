const request = require('request');
const querystring = require('querystring');
var query = require('../../../db/msql');
var utils = require('../../../utils');
var methods = {};
//var facebook = require('facebook-api');
//var OAuth2 = google.auth.OAuth2;
var oAuthFacebook = {};

/*var oauth3Client = new OAuth2(
  "132186554103239",
  "e91408644800c4b8590a3a87ec111aea",
  "https://csca.nctu.edu.tw/auth/Facebook/callback"
);*/

/*var scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
];*/

methods.url = "https://www.facebook.com/dialog/oauth?client_id=132186554103239&scope=email& redirect_uri=https://csca.nctu.edu.tw/auth/Facebook/callback" 

methods.getCode = function(req, res, next){
    oAuthFacebook.code = req.query.code;
    //console.log("code:");
    //console.log(oAuthFacebook.code);
    next();
}

methods.getToken = function(req, res, next){
    /*oauth2Client.getToken(oAuthGoogle.code, function (err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            oauth2Client.setCredentials(tokens);
            oAuthGoogle.token = tokens;
            next();
        }
    });*/
    var token_option = {
	url:"https://graph.facebook.com/oauth/access_token?"+
	"&client_id=" + "132186554103239" + 
	"&client_secret=" + "e91408644800c4b8590a3a87ec111aea" +
	"&code=" + oAuthFacebook.code + 
	"&redirect_uri=" + "https://csca.nctu.edu.tw/auth/Facebook/callback",
        method: "GET"
    };
    request(token_option, function(err,res,body){
	if(!err){
	      oAuthFacebook.token = JSON.parse(body).access_token;
	      //console.log("body");
	      //console.log(body);
	      //oAuthFacebook.token = JSON.parse(body);
	      //console.log("access_token:");
	      //console.log(oAuthFacebook.token);
	      next();
	}
    });

}

methods.getEmail = function(req, res, next){
   request({
            uri: "https://graph.facebook.com/v2.10/me/?access_token=" + oAuthFacebook.token + "&fields=name,email",
            method: "GET",
        }, function(err, res, body){
               oAuthFacebook.email = JSON.parse(body).email;
	       console.log(JSON.parse(body));
	       console.log("user email:");
	       console.log(oAuthFacebook.email);
               //oAuthGoogle.email = body.email;
               //console.log(body.email);
               next();
       });
}

methods.redirectPath = function(req, res){
   var encodeMail = querystring.stringify({ mail: oAuthFacebook.email });
   res.redirect('/students/ProfilePic?'+encodeURIComponent(encodeMail));
   //res.redirect('/students/Head');
}

exports.method = methods;


