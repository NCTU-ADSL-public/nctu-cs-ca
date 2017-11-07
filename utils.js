module.exports.getPersonId = function(profileObj){
  return profileObj.username;
}

module.exports.getPersonIdwCb = function(profileObj, callback){
  callback(profileObj.username);
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
/*
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
	//if(personStatus == 'a')
        	next();
	//else
		//res.redirect("/");
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
*/


