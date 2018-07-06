var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var getTeacherId = require('../course/getTeacherId');
var csrf = require('csurf');
var csrfProtection = csrf();

var TeacherId = getTeacherId.getTeacherId.teacherId;

router.get('/professors/info', TeacherId, function(req, res){

    if(req.session.profile){
        //var teacherName = req.body.name;
        var teacherId = res.locals.teacherId;
        query.findTeacherInfo(teacherId, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            result = JSON.parse(result);
            res.send(result);

        });
     }
     else
        res.redirect('/');

});

module.exports = router;
