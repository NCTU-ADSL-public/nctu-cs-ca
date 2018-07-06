var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var getTeacherId = require('../../course/getTeacherId');

var csrf = require('csurf');
var csrfProtection = csrf();

var TeacherId = getTeacherId.getTeacherId.teacherId;

router.get('/professors/students/projects', TeacherId, function(req, res){

    if(req.session.profile){
    
        var teacherId = res.locals.teacherId;
       // console.log(teacherId);
        query.findTeacherResearch(teacherId, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
           //  console.log(result);
            result = JSON.parse(result);
            if(result.length == 0){
                    var projects = {
                        
                     groups:[]  
                    }
            }
            else{
            var index = [];
           
           // console.log(result[0].research_title);
            var temp = result[0].research_title;
        //    console.log("score:"+result[0].score);
            var projects = {
				grade02:0,
				grade03:0,
                grade04:0,
				grade05:0,
				total_number:0,
                groups: []
            }
            
            var count = 0;

            for(var i = 0; i<result.length; i++){
              if(index[result[i].research_title] == null){
                  var project = {
                        research_title: '',
                        participants : [],
                        year:'',
                        first_second: ''
                  }
                  project.year = result[i].semester;
                  project.research_title = result[i].research_title;
                  project.first_second = result[i].first_second;
                  projects.groups.push(project);
                  index[result[i].research_title] = count;
                  count++;
              }  
            }

            for(var i = 0; i<result.length; i++){
				
                var student = {
                    student_id: '',
                    sname: '',
                    detail: '',
                    score: null
                }
                student.student_id = result[i].student_id;
              //  console.log(result[i].student_id);
                student.score = parseInt(result[i].score);
				var grade = student.student_id.substring(0,2);
				
				switch(grade)
				{
					case '02':
						projects.grade02++;
						break;
					case '03':
						projects.grade03++;
						break;
					case '04':
						projects.grade04++;
						break;
					case '05':
						projects.grade05++;
						break;
				}
                student.sname = result[i].sname;
                student.detail = result[i].class_detail;
                var id = index[result[i].research_title];
                projects.groups[id].participants.push(student);
                        
            }
			projects.total_number = projects.grade04;
            }
           // console.log(projects);
            res.send(projects);

        });
    }
    else
        res.redirect('/');

});

module.exports = router;
