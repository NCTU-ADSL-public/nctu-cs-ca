var express = require('express');
var methods  = require('./methods');

var getCode = methods.method.getCode;
var getToken = methods.method.getToken;
var getProfile = methods.method.getProfile;
var redirectAfterAuth = methods.method.redirectAfterAuth;
var redirectPath = methods.method.redirectPath;

var router = express.Router();

router.get('/auth/Nctu', function(req, res) {
   //console.log("Redirecting from /auth/Nctu");
    res.redirect('https://id.nctu.edu.tw/o/authorize/?client_id=' + methods.oAuthNctu.client_id + '&response_type=code&scope=profile%20name');
});

router.get('/auth/Nctu/callback', getCode, getToken, getProfile,  redirectAfterAuth, redirectPath);

module.exports = router;
