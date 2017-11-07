module.exports.verifyUser = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        console.log("Unverified User");
        console.log(req.profile);
        res.redirect("/");
        return;
  } else{
        console.log("Verified");
        next();
    }
}

module.exports.verifyAssistants = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        console.log("Unverified User");
        console.log(req.profile);
        res.redirect("/");
        return;
  } else{
        console.log("Verified");
        var personStatus = JSON.parse(req.session.profile).personStatus;
        if(personStatus == 'a')
                next();
        else
                res.redirect("/");
    }
}

module.exports.verifyStudents = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        console.log("Unverified User");
        console.log(req.profile);
        res.redirect("/");
        return;
  } else{
        console.log("Verified");
        var personStatus = JSON.parse(req.session.profile).personStatus;
        if(personStatus == 's')
                next();
        else
                res.redirect("/");
    }
}



