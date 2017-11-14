var utils = require('../../../utils');
var getStudentId = {};

getStudentId.studentId = function(req, res, next){
    
    if(req.session.profile){
        var personStatus = JSON.parse(req.session.profile).personStatus;
        //console.log("session profile in get");
        //console.log(req.session.profile);
        if(personStatus == 's')
            //res.locals.studentId = '0316074';
            res.locals.studentId = utils.getPersonId(JSON.parse(req.session.profile));
        else if(personStatus == 'a')
            res.locals.studentId = req.query.student_id;
        //console.log("studentId in get:");
        //console.log(res.locals.studentId);
        next();
    }
    else
        res.redirect('/');
}

exports.getStudentId = getStudentId;
