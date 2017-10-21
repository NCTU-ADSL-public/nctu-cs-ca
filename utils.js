module.exports.getPersonId = function(profileObj){
  return profileObj.username;
}

module.exports.getPersonProgram = function(profileObj){
  return profileObj.program;
}

module.exports.nocache = function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
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

