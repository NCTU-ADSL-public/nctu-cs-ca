var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var getTeacherId = require('../../course/getTeacherId');
var csrf = require('csurf');
var csrfProtection = csrf();

var TeacherId = getTeacherId.getTeacherId.teacherId;

router.get('/professors/courseInfo/courseNow', TeacherId, function(req, res){

    if(req.session.profile){
        
        var teacherId = res.locals.teacherId;
        //console.log("teacherId: " + teacherId); 
        query.teacherCosNow(teacherId, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            result = JSON.parse(result);
          //  console.log(result);
            res.send(result);


        });
    }
    else
        res.redirect('/');
});

module.exports = router;
