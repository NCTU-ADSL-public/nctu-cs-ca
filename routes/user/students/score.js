var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './score')
    },
    filename: function(req, file, cb){
      console.log("file name:")
      console.log(file.originalname);
      cb(null, file.originalname)
      //cb(null, Date.now() + '-'+file.originalname)
    } 
})
var upload = multer({ storage: storage });


router.post('/students/score', upload.any(), function(req, res){
    if(!req.files){
        console.log("No files");
        return;
    }
    console.log(req.files);
    res.redirect('/students/Head?e='+encodeURIComponent('Upload File'));
  });



module.exports = router;

