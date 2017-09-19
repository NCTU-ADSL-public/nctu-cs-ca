module.exports.getPersonId = function(profileObj){
  return profileObj.username;
}


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

