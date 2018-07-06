var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var courseInfo = require('./collectClass').courseInfo;


router.post('/students/courseMap/courseInfo', csrfProtection, courseInfo.collectCourse, courseInfo.addProfiePic, function(req, res){
    res.send(res.locals.collectResult);
});


module.exports = router;
