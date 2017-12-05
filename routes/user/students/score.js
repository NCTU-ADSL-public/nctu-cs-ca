var detectCharacterEncoding = require('detect-character-encoding');
var path = require('path');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './score')
    },
    filename: function(req, file, cb){
      //////console.log("file name:")
      //////console.log(file.originalname);
      cb(null, file.originalname)
      //cb(null, Date.now() + '-'+file.originalname)
    } 
})
var upload = multer({ storage: storage });
var fileBuffer;
var readFile = function(req, res, next){
	//////console.log(req.files[0].originalname);
	fileBuffer = fs.readFileSync(path.join(__dirname, "../../../" + req.files[0].path));
	fs.readFile(path.join(__dirname, "../../../" + req.files[0].path), "utf8", function(err, text){
	//charsetMatch = detectCharacterEncoding(fileBuffer);
	////////console.log(charsetMatch);	
	if(err){
		//////console.log(err);
		next();
	}
	else
	    next();
	});
};
    

router.post('/students/score', upload.any(), readFile, function(req, res){
    if(!req.files){
        //////console.log("No files");
        return;
    }
    
    var charsetMatch = detectCharacterEncoding(fileBuffer);
    //////console.log(charsetMatch);	
    //////console.log(req.files);
    res.redirect('/students/Head?e='+encodeURIComponent('Upload File'));
  });



module.exports = router;

