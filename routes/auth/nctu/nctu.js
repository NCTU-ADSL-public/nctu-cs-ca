var express = require('express');
var utils = require('./methods');

var getCode = utils.method.getCode;
var getToken = utils.method.getToken;
var getProfile = utils.method.getProfile;
var redirectAfterAuth = utils.method.redirectAfterAuth;

var router = express.Router();

router.get('/auth/Nctu', function(req, res) {
    res.redirect('https://id.nctu.edu.tw/o/authorize/?client_id=p6twozVJk4nRwNE5A2mLKT7uzvWeedr6GOL6LXz8&response_type=code&scope=profile%20name');
});

router.get('/auth/Nctu/callback', getCode, getToken, getProfile,  redirectAfterAuth);

module.exports = router;
