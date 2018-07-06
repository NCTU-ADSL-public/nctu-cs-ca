const Teacher = require('./teacher');
var query = require('../../../../db/msql');
var courseInfo = {};
courseInfo.collectCourse = function(req, res, next){
    query.showCosMapIntro(req.body.cos_cname, function(err,result){
        if(err){
//            return next(err); // haven't handle yet
        }
        let courses = JSON.parse(result);
        let teachers = []; // identify different teachers
        let collectResult = []; // Result, store Class
        let english;
        for(let i = 0; i < courses.length; i++){
            if(courses[i].english === true)
                english = '是';
            else
                english = '否';
            let index = teachers.indexOf(courses[i].tname);
            if(index === -1){ // new teacher 
                teachers.push(courses[i].tname);
                let teacher = new Teacher(courses[i].tname);
                teacher.updateAll(courses[i].cos_code, courses[i].reg_num, courses[i].num_limit, courses[i].unique_id,english);
                collectResult.push(teacher);
            }
            else{
                collectResult[index].updateAll(courses[i].cos_code, courses[i].reg_num, courses[i].num_limit, courses[i].unique_id,english);
            }
        }
        res.locals.collectResult = collectResult;
        next();
    });
    
}

courseInfo.addProfiePic = function(req, res, next){
    let collectResult = res.locals.collectResult;
    for(let i = 0; i < collectResult.length; i++){
        collectResult[i].setPhoto(collectResult[i].name, function(name){
            collectResult[i].photo = 'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/' + name + '.jpg';
            //console.log(collectResult[i].photo);
            //console.log(collectResult[i]);
            res.locals.collectResult[i] = collectResult[i];
            //console.log(res.locals.collectResult[i]);
        });
       // console.log("result");
        //console.log(collectResult[i]);
    }
   // console.log(collectResult);
    //res.locals.collectResult = collectResult;
   // console.log(res.locals.collectResult);
    next();
}



//module.exports = collectCourse;
exports.courseInfo = courseInfo;
