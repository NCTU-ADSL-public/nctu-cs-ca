var express = require('express');

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
          if(!req.profile){
              userState = '1';
          }
          else{
              userState = '0';
          }
      }
      console.log("person state:" + userState);
      res.send(userState);

});

module.exports = router;

