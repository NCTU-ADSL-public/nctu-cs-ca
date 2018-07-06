var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var getTeacherId = require('../../course/getTeacherId');

var csrf = require('csurf');
var csrfProtection = csrf();

var TeacherId = getTeacherId.getTeacherId.teacherId;

router.get('/professors/courseInfo/courses',TeacherId, function(req, res){

    if(req.session.profile){
        
        var teacherId = res.locals.teacherId;  
        query.teacherCosAll(teacherId, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');

            result = JSON.parse(result);
      //      console.log(result);
            for(let i = 0; i<result.length; i++){
                 let year = result[i].unique_id.substring(0,3);
                 let sem = result[i].unique_id.substring(4,5);
                 let id  = result[i].unique_id.substring(6,10);
                 if(sem == 1)
                     result[i].unique_id = year + '上(' + id+ ')';
                 else if(sem == 2)
                     result[i].unique_id = year + '下(' + id+ ')';
                 else
                     result[i].unique_id = year + '暑期(' + id+ ')';       
            }
            res.send(result);


        });
    }
    else
        res.redirect('/');
});

module.exports = router;
