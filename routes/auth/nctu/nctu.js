var express = require('express');
var utils = require('./methods');

var getCode = utils.method.getCode;
var getToken = utils.method.getToken;
var getProfile = utils.method.getProfile;
var redirectAfterAuth = utils.method.redirectAfterAuth;

var router = express.Router();

router.get('/auth/Nctu', function(req, res) {
    res.redirect('https://id.nctu.edu.tw/o/authorize/?client_id=h0gpKBJOxUr76R9nTYBGk9IFa1jkXFxi8EJsD6GV&response_type=code&scope=profile%20name');
});

router.get('/auth/Nctu/callback', getCode, getToken, getProfile,  redirectAfterAuth);

module.exports = router;
