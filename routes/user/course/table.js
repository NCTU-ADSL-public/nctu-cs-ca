const request = require('request');
var query = require('../../../db/msql');
var utils = require('../../../utils');

//資電A 資工B 網多C
var table = {};

function queryProfile(studentId, callback){
    query.findPerson(studentId, function(err, profile){
        if(!profile){
            console.log("Can't find the student");
            return;
        }
        if(err){
            throw err;
            return;
        }
        else
            callback(profile);
    });
}

function queryPass(studentId, callback){
	query.Pass(studentId, function(err, pass){
		if(!pass){
			////console.log("Can't find the student.");
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
			////console.log("Can't find the student.");
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
			////console.log("Can't find student");
			throw err;
			return;
		}
		if(!result)
			return;
		result = JSON.parse(result);
		info.program = result[0].program;
	        query.Group(studentId, function(err, result){
			if(!result){
				////console.log("Cannot find the student.");
				return;
			}
			if(err){
				throw err;
				return;
			}
                	else{
                    		info.group = result;
                    		////console.log("tablequerycourseelse");
	           	 	processCourse(info, function(course){		
                        		callback(course);
                    		});
			}
                });
	});
}

function processCourse(info, callback){
         
	var program = info.program.substring(0,2);
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

function queryList(studentId, callback){
	query.studentGraduateList(studentId, function(err, list){
                if(!list){
                        console.log("Can't find the student.");
                        return;
                }
                if(err){
                        throw err;
                        return;
                }
                else
                        callback(list);
        });
}

function queryFree(studentId, callback){
	query.offset(studentId, function(err, free){
		if(!free){
			////console.log("Can't find free course list");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(free);
	});
}

function queryNow(studentId, callback){
	query.on_cos_data(studentId, function(err, now){
		if(!now){
			////console.log("Can't find now course");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(now);
	});
}

function queryGeneral(callback){
	query.general_cos_rule(function(err, general){
		if(!general){
			////console.log("Can't find geberal courses");
			return;
		}
		if(err){
			throw err;
			return;
		}
		else
			callback(general);
	});
}

function queryChange(studentId, callback){
    query.cosMotion(studentId, function(err, change){
        if(!change){
            //console.log(" No change");
            return;
        }
        if(err){
            throw err;
            return;
        }
        //console.log(change);
        else
            callback(change);
    });
}

table.getProfile = function(studentId, callback){
    queryProfile(studentId, function(profile){
    callback(profile);
    });
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
        callback(rules);
    });
}
table.getList = function(studentId, callback){
    queryList(studentId, function(list){
	callback(list);
    });
}
table.getFree = function(studentId, callback){
    queryFree(studentId, function(free){
	callback(free);
    });
}
table.getNow = function(studentId, callback){
    queryNow(studentId, function(now){
        callback(now);
    });
}
table.getGeneral = function(callback){
    queryGeneral(function(general){
        callback(general);
    });
}
table.getChange = function(studentId, callback){
    queryChange(studentId, function(change){
        callback(change);
    });
}
exports.tables = table;

