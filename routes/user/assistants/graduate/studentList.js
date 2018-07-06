var express = require('express');
var apps = express();
var table = require('../../course/table');
var utils = require('../../../../utils');
var router = express.Router();
var getList = table.tables.getList;

router.get('/assistants/graduate/list', function(req, res){
	
	var list;
        table.tables.getList('all', function(list){
        	if(!list){
			//console.log("No list");
			return;
		}
		else
			res.send(list);	
	});
    
});


module.exports = router;
