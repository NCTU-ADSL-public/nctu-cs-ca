var utils = require('../../../utils');
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
        // originalUrl: /students/graduate/revised
        let checkIndex = checkPage.indexOf("/", 1);
        // start from 1 to find the second /
        checkPage = checkPage.substring(1, checkIndex);
        // get students or assistants
        if(checkPage === "students"){
             //res.locals.studentId = '0416201';  
            res.locals.studentId = utils.getPersonId(JSON.parse(req.session.profile));
        }
        else if(checkPage === "assistants"){
            //res.locals.studentId = '0416201'; 
            res.locals.studentId = req.query.student_id;
        }

        next();
    }
    else
        res.redirect('/');
}

exports.getStudentId = getStudentId;
