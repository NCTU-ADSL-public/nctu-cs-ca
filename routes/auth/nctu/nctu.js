var express = require('express');
var utils = require('./methods');

var getCode = utils.method.getCode;
var getToken = utils.method.getToken;
var getProfile = utils.method.getProfile;
var redirectAfterAuth = utils.method.redirectAfterAuth;

var router = express.Router();

router.get('/auth/Nctu', function(req, res) {
    console.log("Redirecting from /auth/Nctu");
    res.redirect('https://id.nctu.edu.tw/o/authorize/?client_id=' + utils.oAuthNctu.client_id + '&response_type=code&scope=profile%20name');
});

router.get('/auth/Nctu/callback', getCode, getToken, getProfile,  redirectAfterAuth);

module.exports = router;
