var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var utils = require('../../../utils');

var csrf = require('csurf');
var csrfProtection = csrf();



router.post('/students/courseMap/courseInfo', csrfProtection, function(req, res){

    var name  = req.body.cos_cname;
    if(req.session.profile){
       
        var courseInfo = [];
        var teacherName = [];
        var teacherIndex = [];
        var course = {
            teacher: '',
            codes: [],
            stuNum: [],
            stuLimit:[],
            english:[],
            time:[]
        }
        var result;
        var count = -1;
        
        query.showCosMapIntro(name, function(err,result){
            if(err){
                throw err;
                return;
            }
            if(!result)
                res.redirect('/');
                //return;
            //console.log(result);    
        
//            console.log(result);
            result = JSON.parse(result);
        
            for(var i = 0; i<result.length; i++){
               if(teacherName[result[i].tname] != true){
                    count++;
                    teacherName[result[i].tname] = true;
                    teacherIndex[result[i].tname] = count;
                    var course = {
                        teacher:'',
                        codes: [],
                        stuNum: [],
                        stuLimit:[],
                        english:[],
                        time: []
                    }
                    course.teacher = result[i].tname;
                    course.codes.push(result[i].cos_code);
                    course.stuNum.push(result[i].reg_num);
                    course.stuLimit.push(result[i].num_limit);
                    course.time.push(result[i].unique_id);
                    if(result[i].english == true)
                        course.english.push('是');
                    else
                        course.english.push('否');    
                    courseInfo.push(course);
               }
               else{
                    courseInfo[teacherIndex[result[i].tname]].codes.push(result[i].cos_code);
                    courseInfo[teacherIndex[result[i].tname]].stuNum.push(result[i].reg_num);
                    courseInfo[teacherIndex[result[i].tname]].stuLimit.push(result[i].num_limit);
                    courseInfo[teacherIndex[result[i].tname]].time.push(result[i].unique_id);
                    if(result[i].english == true)
                        courseInfo[teacherIndex[result[i].tname]].english.push('是');
                    else
                        courseInfo[teacherIndex[result[i].tname]].english.push('否');
               }
            }
  //          console.log(courseInfo);
            res.send(courseInfo);
       });
    }
    else
        return;
});


module.exports = router;
