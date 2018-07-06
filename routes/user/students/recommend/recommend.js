var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var getStudentId = require('../../course/getStudentId');
var csrf = require('csurf');
var csrfProtection = csrf();

var StudentId = getStudentId.getStudentId.studentId;
router.get('/students/courses/recommend', StudentId, function(req, res){
    
    if(req.session.profile){

        var studentId = res.locals.studentId;
        query.getRecommend(studentId, function(err, result){
                if(err){
                    throw err;
                    return;
                }
                if(!result)
                    res.redirect('/');

                result = JSON.parse(result);
               // console.log(result);
                res.send(result);
        });
    }

});

module.exports = router;
