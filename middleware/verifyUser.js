module.exports.verifyUser = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        //////console.log("Unverified User");
        //////console.log(req.profile);
        res.redirect("/");
        return;
  } else{
        //////console.log("Verified");
        next();
    }
}

module.exports.verifyProgram = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        //////console.log("Unverified User");
        //////console.log(req.profile);
        res.redirect("/");
        return;
  } else{
        if(req.profile[0].program.substr(0,2) !== '網多')
            res.redirect('/');
        else
            next();
    }
}

module.exports.verifyGrade = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        //////console.log("Unverified User");
        //////console.log(req.profile);
        res.redirect("/");
        return;
  } else{
        if(req.profile[0].student_id.substr(0,2) === '03' || req.profile[0].student_id.substr(0,2) === '06')
            next();
        else
            res.redirect('/');
    }
}

module.exports.verifyAssistants = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        //////console.log("Unverified User");
        //////console.log(req.profile);
        res.redirect("/");
        return;
  } else{
        //////console.log("Verified");
        var personStatus = JSON.parse(req.session.profile).personStatus;
        if(personStatus == 'a' || personStatus == 'w')
                next();
        else
                res.redirect("/");
    }
}

module.exports.verifyStudents = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        //////console.log("Unverified User");
        //////console.log(req.profile);
        res.redirect("/");
        return;
  } else{
        //////console.log("Verified");
        var personStatus = JSON.parse(req.session.profile).personStatus;
        if(personStatus == 's' || personStatus == 'w' || personStatus == 'c')
                next();
        else
                res.redirect("/");
    }
}

module.exports.verifyProfessors = function(req, res, next){
    if(!(req.profile && req.profile.length)){
        res.redirect("/");
        return;
    } else{
          var personStatus = JSON.parse(req.session.profile).personStatus;
          if(personStatus == 'p' || personStatus == 'w' || personStatus == 't')
              next();
          else
              res.redirect("/");
      }
}

