var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var getTeacherId = require('../../course/getTeacherId');
var csrf = require('csurf');
var csrfProtection = csrf();

var TeacherId = getTeacherId.getTeacherId.teacherId;

router.post('/professors/courseInfo/scoreInterval', csrfProtection, function(req, res){

    if(req.session.profile){
        
        var cos_code = req.body.cos_code;
        var unique_id = req.body.unique_id;  
       // console.log("course Info in interval");
        //console.log(cos_code);
        //console.log(unique_id);
        var year = unique_id.substring(0,3);
        var sem = unique_id.substring(3,4);
        var id = unique_id.substring(5,9);
        if(sem == '上')
            unique_id = year + '-1-' + id;
        else if(sem == '下')
            unique_id = year + '-2-' + id;
        else
            unique_id = year + '-3-' + id;
       // console.log(unique_id);

        query.showCosScoreInterval(cos_code, unique_id, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            result = JSON.parse(result);
           //console.log(result);
            res.send(result);


        });
    }
    else
        res.redirect('/');
});

module.exports = router;
