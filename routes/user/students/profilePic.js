var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
var utils = require('../../../utils');
var fs = require('fs')
  , gm = require('gm');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './profilePic');
    },
    filename: function(req, file, cb){
      var personId = utils.getPersonId(JSON.parse(req.session.profile));
      cb(null, personId + '.png');
    } 
})
var upload = multer({ storage: storage, limits:{ fileSize: 600 * 1024 }}).single('profilePic');



router.post('/students/ProfilePic',  function(req, res){
    upload(req, res, function(err){
    if(err){
	console.log('err' + err);
	return res.end("File too big, GG");
    }});
    var personId = utils.getPersonId(JSON.parse(req.session.profile));
    gm(path.join(__dirname, '../../../profilePic/') + personId + '.png')
    .resize(44, 44)
    .noProfile()
    .write(path.join(__dirname, '../../../profilePic/') + personId + '_crop.png', function (err) {
      if (!err) console.log('done');
      else{
	console.log(err);
      }
    res.redirect('/students/ProfilePic');
  })});



module.exports = router;

