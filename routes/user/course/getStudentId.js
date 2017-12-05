var utils = require('../../../utils');
var getStudentId = {};

getStudentId.studentId = function(req, res, next){
    
    if(req.session.profile){
        var personStatus = JSON.parse(req.session.profile).personStatus;
        if(personStatus === 's') 
            res.locals.studentId = utils.getPersonId(JSON.parse(req.session.profile));
        else if(personStatus == 'a')
            res.locals.studentId = req.query.student_id;
        next();
    }
    else
        res.redirect('/');
}

exports.getStudentId = getStudentId;
