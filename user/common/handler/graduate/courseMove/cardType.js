var query = require('../../../../../../db/msql');
var cardsets = {};
//var getStudentId = require('../../course/getStudentId');
//var StudentId = getStudentId.getStudentId.studentId;


// Define the properties that all cards have
cardsets.Card = function(code, name, type, sId){   // Other
    this.code = code; // Eg: DAC1311
    this.name = name;
    this.type = type;
    this.sId = sId;
}

cardsets.Card.prototype.check = function(callback){
    let checkCode = this.code.substring(0,3);
    let checkFullCode = this.code.substring(0,7);
    let checkOneCode = this.code;
    let checkName = this.name;
    let checkType = this.type;
    let studentId = this.sId;
    query.ShowCosGroup(studentId, function(err, result){
        let table = JSON.parse(result);
        for(let i = 0; i < table.length; i++){
            for(let j = 0; j < table[i].cos_codes.length; j++){
                if(table[i].cos_codes[j]+"_one" === checkOneCode){
                    callback('其他選修');
                    return;
                }
                if(table[i].cos_codes[j] === checkFullCode && table[i].type == "必修"){
                    callback('');
                    return;
                }
            }
        }
        if(checkType === "軍訓" || checkCode === "PYY" || checkName === "藝文賞析教育")  // Eng, Repeat
            callback('');
        else callback('其他選修'); // can move if have not defined
    });
    //else if(checkEnStatus == 0 || checkEnStatus == null){
        //if(checkType == )
    //}
}

// All targets will inherit Card and specific functions are defined to verify if it do belong to the group
// Group: 必修 核心

cardsets.Compulsory = function(code, type, sId){
    
    this.code = code; // Eg: DAC1311
    this.type = type; // Eg: 必修
    this.sId = sId;   // Eg: 0312512
};

cardsets.Compulsory.prototype = new cardsets.Card();

cardsets.Compulsory.prototype.check = function(callback){
    let checkCode = this.code;
    let checkType = this.type;
    let studentId = this.sId;
    // check if the course code exist in the group table
    query.ShowCosGroup(studentId, function(err, result){
        let table = JSON.parse(result);
        for(let i = 0; i < table.length && checkType === "必修" ; i++){
            for(let j = 0; j < table[i].cos_codes.length; j++){
                if(table[i].cos_codes[j] === checkCode){
                    callback('共同必修');
                    return;
                }
            }
        }
        callback('');
    });
}

cardsets.Core = function(code, type, sId){
    
    this.code = code; // Eg: DAC1311
    this.type = type; // Eg: 必修
    this.sId = sId;   // Eg: 0312512
    
};

cardsets.Core.prototype = new cardsets.Card();

cardsets.Core.prototype.check = function(callback){
    let checkCode = this.code;
    let checkType = this.type;
    let studentId = this.sId;
    // check if the course code exist in the group table
    // group's
    query.ShowCosGroup(studentId, function(err, result){
        //console.log(studentId);
        //console.log(checkType);
        let table = JSON.parse(result);
        for(let i = 0; i < table.length && checkType === "選修" ; i++){
            //console.log(i + ": " + table[i].type);
            for(let j = 0; j < table[i].cos_codes.length && table[i].type === "核心"; j++){
                if(table[i].cos_codes[j] === checkCode){
                    callback(true);
                    return;
                }
            }
        }
        callback(false);
    });

}

cardsets.SecondaryCore = function(code, type, sId){
    
    this.code = code; // Eg: DAC1311
    this.type = type; // Eg: 必修
    this.sId = sId;   // Eg: 0312512
    
};

cardsets.SecondaryCore.prototype = new cardsets.Card();

cardsets.SecondaryCore.prototype.check = function(callback){
    let checkCode = this.code;
    let checkType = this.type;
    let studentId = this.sId;
    // check if the course code exist in the group table
    // other group's core or secondary core -> not core and compulsory
    query.ShowCosGroup(studentId, function(err, result){
        let table = JSON.parse(result);    
        for(let i = 0; i < table.length && checkType === "選修" ; i++){
            for(let j = 0; j < table[i].cos_codes.length && (table[i].type !== "必修" && table[i].type !== "核心"); j++){
                if(table[i].cos_codes[j] === checkCode){
                    callback(true);
                    return;
                }
            }
        }
        callback(false);
    });

}

cardsets.Elective = function(code, name, type, sId){
    
    this.code = code; // Eg: DAC1311
    this.name = name; // Eg: 導師時間
    this.type = type;
    this.sId = sId;
    
};

cardsets.Elective.prototype = new cardsets.Card();

cardsets.Elective.prototype.check = function(callback){
    let checkCode = this.code.substring(0, 3);
    let checkFullCode = this.code.substring(0,7);
    let checkOneCode = this.code;
    let checkName = this.name;
    let checkType = this.type;
    let studentId = this.sId;
    // check if course code matches department
    query.ShowCosGroup(studentId, function(err, result){
        let table = JSON.parse(result);
        for(let i = 0; i < table.length; i++){
            for(let j = 0; j < table[i].cos_codes.length; j++){
                if(table[i].cos_codes[j]+"_one" === checkOneCode){
                    callback('專業選修');
                    return;
                }
                if(table[i].cos_codes[j] === checkFullCode && table[i].type === "必修"){
                    callback('');
                    return;
                }
            }
        }
        var EEcos = ["UEE2101", "DEE2548", "DEE2542", "UEE2601", "UEE4605"];
        for(let i = 0; i < EEcos.length; i++){
            if(checkFullCode === EEcos[i]){
                callback('專業選修');
                return;
            }
        }
        if(checkCode === "DCP" || checkCode === "IOC" || checkCode === "IOE" || checkCode === "ILE" || checkCode === "IDS"){
            if(checkName === "服務學習(一)" || checkName === "服務學習(二)" || checkName === "導師時間" || checkName === "教學實務" || checkName === "個別研究")
                callback(''); // these courses although held by CS cannot be placed in elective course
            else
                callback('專業選修');
        }
        else{
            // check if physic chemistry biology
            query.ShowCosGroup(studentId, function(err, result){     // studentId??
                let table = JSON.parse(result);
                for(let i = 0; i < table.length; i++){
                    if(table[i].cos_cname.substring(0, 6) === "物化生三選一"){
                        for(let j = 0; j < table[i].cos_codes.length; j++){
                            if(table[i].cos_codes[j] === checkFullCode){
                                callback('專業選修');
                                return;
                            }
                        }
                    }
                }
                callback('');
            });
        }
    });
}

cardsets.Language = function(type){
    
    this.type = type; // Eg: 外語 
    
};

cardsets.Language.prototype = new cardsets.Card();

cardsets.Language.prototype.check = function(callback){
    let checkType = this.type;
    if(checkType === "外語")
        callback('外語');
    else
        callback('');


}

cardsets.General = function(code, sId){
    
    this.code = code;
    this.sId = sId;
    
};

cardsets.General.prototype = new cardsets.Card();

cardsets.General.prototype.check = function(callback){
    let checkCode = this.code;
    let studentId = this.sId;
	query.ShowUserAllScore(studentId, function(err, result){
        let res = JSON.parse(result);
        for(let i = 0; i < res.length; i++){
            if(checkCode == res[i].cos_code){
                if(res[i].brief){
                    callback('通識(舊制)-' + res[i].brief + '|通識(新制)-' + res[i].brief_new);
                    return;
                }
                else{
                    callback('');
                    return;
                }
            }
        }
    });
    // some classes can be admit as general course
        /*query.general_cos_rule(function(err, result){
            let table = JSON.parse(result);
            for(let i = 0; i < table.length; i++){
                if(checkCode === table[i].cos_code){
                    callback(true);
                    return;
                }
                
            }            
            callback(false);
       });*/
}

cardsets.PE = function(code){
    
    this.code = code;
    
};

cardsets.PE.prototype = new cardsets.Card();

cardsets.PE.prototype.check = function(callback){
    let checkCode = this.code.substring(0,3);
    if(checkCode === "PYY")
        callback('體育');
    else
        callback('');

}

cardsets.Serve = function(type){
    
    this.type = type;
    
};

cardsets.Serve.prototype = new cardsets.Card();

cardsets.Serve.prototype.check = function(callback){
    let checkType = this.type;
    if(checkType === "服務學習" || checkType === "通識服務學習" )
        callback('服務學習');
    else
        callback('');

}

cardsets.Art = function(name){
    
    this.name = name;
    
};

cardsets.Art.prototype = new cardsets.Card();

cardsets.Art.prototype.check = function(callback){
    let checkName = this.name;
    if(checkName === "藝文賞析教育")
        callback('藝文賞析');
    else
        callback('');

}

cardsets.Graduate = function(code, type){
    this.code = code;
    this.type = type;
};

cardsets.Graduate.prototype = new cardsets.Card();

cardsets.Graduate.prototype.check = function(callback){
    let checkCode = this.code.substring(0,3);
    let checkType = this.type;
    if(checkCode === "IOC" || checkCode === "IOE" || checkCode === "ILE" || checkCode === "IDS" || checkType === "大學部修研究所課程")
        callback('抵免研究所課程');
    else callback('');
}

cardsets.AdditionProgram = function(type){
    this.type = type;
};

cardsets.AdditionProgram.prototype = new cardsets.Card();

cardsets.AdditionProgram.prototype.check = function(callback){
  let checkType = this.type;
  if(checkType == '必修')
    callback('');
  else
      callback('雙主修、輔系、學分學程');
}

exports.cardset = cardsets;
