var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res){
  req.session.reset();
  res.redirect('/');
});

module.exports = router;
