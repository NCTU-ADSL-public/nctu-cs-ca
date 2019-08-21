var utils = require('../../../../utils');
var getTeacherId = {};

getTeacherId.teacherId = function(req, res, next){
    
    if(req.session.profile){
        res.locals.teacherId = utils.getPersonId(JSON.parse(req.session.profile));;
        if(res.locals.teacherId == '0316201' || res.locals.teacherId == '0312512'||res.locals.teacherId == '0416014' || res.locals.teacherId == '0416008'||res.locals.teacherId == '0416004' || res.locals.teacherId == '0416081' || res.locals.teacherId == '0516003' || res.locals.teacherId == '0516205'||res.locals.teacherId =='0616005')
        //res.locals.teacherId = 'T9229';
        //console.log("getting");
        //res.locals.teacherId = 'T8058';
         res.locals.teacherId = 'T0525';
        next();
    }
    else
        res.redirect('/');
}

exports.getTeacherId = getTeacherId;
