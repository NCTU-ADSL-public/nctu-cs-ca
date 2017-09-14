module.exports.getStudentId = function(req, res, next){

  var tmp = req.session.profile;
  console.log("Utils:" + tmp);

  next();
}
