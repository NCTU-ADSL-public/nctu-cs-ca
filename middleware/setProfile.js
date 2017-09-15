var utils = require('../utils');
var query = require('../db/msql');

module.exports.setProfile = function(req, res, next){
  if(req.session.profile) {
      var profileObj = JSON.parse(req.session.profile);
      var studentId = utils.getStudentId(profileObj);
      query.findPerson(studentId,function(err,result){
          if(err){
                throw err;
                return;
          }
          result = JSON.parse(result);
          if(result.length && result){
              req.profile = result;
              next();
          }
          else{
              next();
          }
      });
    } else {
      next();
    }
}
