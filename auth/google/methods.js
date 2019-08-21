const request = require('request');
const querystring = require('querystring');
var query = require('../../../db/msql');
var utils = require('../../../utils');
var methods = {};
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oAuthGoogle = {};

var oauth2Client = new OAuth2(
  "1017503793735-jpedoci3us05amvc60ak1sb1ccnutqvt.apps.googleusercontent.com",
  "OR2Ha_G7IfA5Y-LLEwVuuEm1",
  "https://csca.nctu.edu.tw/auth/Google/callback"
);

var scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
];

methods.url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

methods.getCode = function(req, res, next){
    oAuthGoogle.code = req.query.code;
    next();
}

methods.getToken = function(req, res, next){
    oauth2Client.getToken(oAuthGoogle.code, function (err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            oauth2Client.setCredentials(tokens);
            oAuthGoogle.token = tokens;
            next();
        }
    });
    
}

methods.getEmail = function(req, res, next){
    request({
            uri: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + oAuthGoogle.token.access_token,
            method: "GET",
        }, function(err, res, body){
	       body = JSON.parse(body);
	       oAuthGoogle.email = body.email;
	       console.log(body.email);
               next();
       });
}

methods.redirectPath = function(req, res){
   var encodeMail = querystring.stringify({ mail: oAuthGoogle.email });
   res.redirect('/students/ProfilePic?'+encodeURIComponent(encodeMail));
}

exports.method = methods;
