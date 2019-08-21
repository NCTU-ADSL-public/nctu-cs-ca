var utils = require('../../../../utils');
var getStudentId = {};

getStudentId.studentId = function(req, res, next){
    
    if(req.session.profile){
        /*console.log(req.originalUrl);
        var personStatus = JSON.parse(req.session.profile).personStatus;
        if(personStatus === 's') 
            res.locals.studentId = utils.getPersonId(JSON.parse(req.session.profile));
        else if(personStatus == 'a')
            res.locals.studentId = req.query.student_id;*/
        let checkPage = req.originalUrl;
        let checkPage2 = req.originalUrl;
        //console.log(checkPage2)
        // originalUrl: /students/graduate/revised
        let checkIndex = checkPage.indexOf("/", 1);
       // let checkIndex2 = checkPage.indexOf("/", checkIndex);
        // start from 1 to find the second /
        checkPage = checkPage.substring(1, checkIndex);
        if(checkPage === 'api')
            checkPage = 'students';
        checkPage2 = checkPage2.substring(1, checkIndex);

        // get students or assistants
        //console.log(checkPage);
        if(checkPage === "students"){
         //console.log("get student ID:");
           //console.log(JSON.parse(req.session.profile));
           //res.locals.professional_field = req.body.professional_field;
           
           res.locals.studentId = utils.getPersonId(JSON.parse(req.session.profile));
            //res.locals.studentId = '0616215';
             //res.locals.studentId = '0416033'; 
            if (res.locals.studentId[0] == 'E') {
                res.locals.studentId = req.query.student_id;
            }
        }
        else if(checkPage2 === "assistants"){
            //console.log("get assistant!")
            res.locals.professional_field = req.query.professional_field;
                
            res.locals.studentId = req.query.student_id;
           // console.log("ass:" + req.query.student_id);
            //console.log(checkPage2)
            //res.locals.studentId = '0316005';
        }

        next();
    }
    else
        res.redirect('/');
}

getStudentId.studentId_post = function(req, res, next) {
    if (req.session.profile) {
        res.locals.studentId = req.body.student_id;
        next();
    } else {
        res.redirect('/');
    }
}

exports.getStudentId = getStudentId;
