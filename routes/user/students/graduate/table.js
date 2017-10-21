const request = require('request');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');

//資電A 資工B 網多C
var table = {};

function queryPass(studentId, callback){
	query.Pass(studentId, function(err, pass){
		if(!pass){
			console.log("Can't find the student.");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(pass);
	});
}

function queryRule(studentId, callback){
	query.graduateRule(studentId, function(err, rules){
		if(!rules){
			console.log("Can't find the student.");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(rules);
	});

}

function queryCourse(studentId, callback){
        var info = {
            group: '',
            program: '',
        };
	query.findPerson(studentId, function(err,result){
		if(err){
			console.log("Can't find student");
			throw err;
			return;
		}
		if(!result)
			return;
		result = JSON.parse(result);
		info.program = result[0].program;
	        query.Group(studentId, function(err, result){
		if(!result){
			console.log("Cannot find the student.");
			return;
		}
		if(err){
			throw err;
			return;
		}
                else{
                    info.group = result;
                    console.log("tablequerycourseelse");
	            processCourse(info, function(course){		
                        callback(course);
                    });
		}
                });
	});
             //callback(course);
	     //else return;

}

function processCourse(info, callback){
         
	var program = info.program;
        var result = info.group;
	var course = {
                compulse: [],
                core: [],
                vice:[],
                others: [],
                elective:[],
		total:[]
        }
	result = JSON.parse(result);
	course.total = result;
        console.log("processcourse" + program);
	//console.log("in table second program:" + program);	
	if(program == '資電' ){
		for(var i = 0; i < result.length; i++){

			switch(result[i].type){
				case '必修' :
					course.compulse.push(result[i]);
					break;  
				case '核心' :
					course.core.push(result[i]);
					break;  
				case '副核心' :
					course.vice.push(result[i]);
					break;  
				case '網多核心': case '資工核心' :
					course.others.push(result[i]);
					break;  
			} 
		 }
                callback(course);
	}
	else if(program == '資工'){
		for(var i = 0; i < result.length; i++){

			switch(result[i].type){
				case '必修' :
					course.compulse.push(result[i]);
					break;  
				case '核心' :
					course.core.push(result[i]);
					break;  
				case '副核心' :
					course.vice.push(result[i]);
					break;  
				case '資電核心': case '網多核心' :
					course.others.push(result[i]);
					break;  
			} 

		}
                callback(course);
	}
	else if(program == '網多'){
		for(var i = 0; i < result.length; i++){
		
			switch(result[i].type){
				case '必修' :
					course.compulse.push(result[i]);
					break;
				case '核心' :
					course.core.push(result[i]);
					break;
					case '副核心' :
						course.vice.push(result[i]);
						break;
					case '資電核心': case '資工核心' :
						course.others.push(result[i]);
						break;
			}	
		
		}
                callback(course);
	}

}

table.getPass = function(studentId, callback){
    queryPass(studentId, function(pass){
	callback(pass);
    });
}
table.getCourse = function(studentId, callback){
    queryCourse(studentId, function(course){
	callback(course);
    });
}
table.getRule = function(studentId, callback){
    queryRule(studentId, function(rules){
        console.log("rule:" + JSON.stringify(rules));
        callback(rules);
    });
}



exports.tables = table;

