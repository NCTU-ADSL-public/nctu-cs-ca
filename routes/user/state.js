var express = require('express');
var utils = require('../../utils');

var router = express.Router();
// 2: new user who has not login
// 1: user not from cs department
// 0: user from cs department
router.get('/user/state', function(req, res){
      var userState;
      if(!req.session.profile){
          userState = '2';
      }
      else{
          var profileObj = JSON.parse(req.session.profile);
	  var personId = utils.getPersonId(profileObj);
	  var grade = parseInt(personId.substring(0,2)) + 100;
	  if(!req.profile){
              	userState = '1';
          }
          else{
                if(grade <= 103)
	      		userState = '0';
		else
			userState = '3';
          }
      }
      //console.log("person state:" + userState);
      res.send(userState);

});

module.exports = router;

