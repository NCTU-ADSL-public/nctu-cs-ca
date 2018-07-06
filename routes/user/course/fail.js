var fail = {};
fail.processFail = function(req, res, next){
    if(req.session.profile){
        var pass =JSON.parse(req.pass);
        //console.log(pass);
        var studentId = res.locals.studentId;
        var temp = parseInt(studentId.substring(0,2));
        var school_year = (100+temp);
        var failCos = [];
        for(var i = 0; i<pass.length; i++){
            if(pass[i].cos_type == '必修'){
                if(pass[i].pass_fail != '通過'){
                    var cosInfo = {
                        cn: '',
                        en: '',
                        score: -1,
                        grade: '0',
                        pass: '',
                        year: '',
                        semester: '',
                        teacher: '' 
                    };
                    cosInfo.cn = pass[i].cos_cname;
                    cosInfo.en = pass[i].cos_ename;
                    cosInfo.score = parseInt(pass[i].score);
                    cosInfo.grade = pass[i].score_level;
                    cosInfo.pass = pass[i].pass_fail;
                    cosInfo.year = parseInt(pass[i].year);
                    cosInfo.semester = parseInt(pass[i].semester);
                    cosInfo.teacher = pass[i].tname;
                    failCos.push(cosInfo);
                }
            }
        }
       // console.log(failCos);
        res.locals.failCos = failCos;
        next();
    }
    else
        res.redirect('/');
}

exports.fail = fail;

