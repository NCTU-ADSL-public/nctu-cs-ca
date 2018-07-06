var mapPass = {};
mapPass.processMapPass = function(req, res, next){
    if(req.session.profile){
        //console.log("mapPass");
        var mapPass = JSON.parse(req.mapPass);
        //console.log(mapPass);
        var mapCourse = req.course;
       // console.log(mapCourse);
        //console.log(mapPass);
        res.locals.mapPass = mapCourse;
    }

}

exports.mapPass = mapPass;
