var query = require('../../../../../db/msql');
var cardsets = {};


// Define the properties that all cards have
cardsets.Card = function(code){

    this.code = code; // Eg: DAC1311

}

cardsets.Card.prototype.check = function(callback){
    callback(true); // can move if have not defined
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
    query.Group(studentId, function(err, result){
        let table = JSON.parse(result);    
        for(let i = 0; i < table.length && checkType === "必修" ; i++){
            for(let j = 0; j < table[i].cos_codes.length; j++){
                if(table[i].cos_codes[j] === checkCode){
                    callback(true);
                    return;
                }
            }
        }
        callback(false);
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
    query.Group(studentId, function(err, result){
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
    query.Group(studentId, function(err, result){
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

cardsets.Elective = function(code, name){
    
    this.code = code; // Eg: DAC1311
    this.name = name; // Eg: 導師時間 
    
};

cardsets.Elective.prototype = new cardsets.Card();

cardsets.Elective.prototype.check = function(callback){
    let checkCode = this.code.substring(0, 3);
    let checkFullCode = this.code;
    let checkName = this.name;
    // check if course code matches department
    if(checkCode === "DCP" || checkCode === "IOC" || checkCode === "IOE" || checkCode === "ILE"){
        if(checkName === "服務學習(一)" || checkName === "服務學習(二)" || checkName === "導師時間")
            callback(false); // these courses although held by CS cannot be placed in elective course
        else
            callback(true);
    }
    else{
        // check if physic chemistry biology
        query.Group("0316201", function(err, result){
            let table = JSON.parse(result);
            for(let i = 0; i < table.length; i++){
                if(table[i].cos_cname.substring(0, 6) === "物化生三選一"){
                    for(let j = 0; j < table[i].cos_codes.length; j++){
                        if(table[i].cos_codes[j] === checkFullCode){
                            callback(true);
                            return;
                        }
                    }
                }
            }
            callback(false);
        });
    }

}

cardsets.Language = function(type){
    
    this.type = type; // Eg: 外語 
    
};

cardsets.Language.prototype = new cardsets.Card();

cardsets.Language.prototype.check = function(callback){
    let checkType = this.type;
    if(checkType === "外語")
        callback(true);
    else
        callback(false);


}

cardsets.General = function(code, type){
    
    this.type = type; // Eg: 外語 
    this.code = code;
    
};

cardsets.General.prototype = new cardsets.Card();

cardsets.General.prototype.check = function(callback){
    let checkType = this.type;
    let checkCode = this.code;
    if(checkType === "通識")
        callback(true);
    else{
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
            callback(false);
    }

}

cardsets.PE = function(code){
    
    this.code = code;
    
};

cardsets.PE.prototype = new cardsets.Card();

cardsets.PE.prototype.check = function(callback){
    let checkCode = this.code.substring(0,3);
    if(checkCode === "PYY")
        callback(true);
    else
        callback(false);

}

cardsets.Serve = function(type){
    
    this.type = type;
    
};

cardsets.Serve.prototype = new cardsets.Card();

cardsets.Serve.prototype.check = function(callback){
    let checkType = this.type;
    if(checkType === "服務學習" || checkType === "通識服務學習" )
        callback(true);
    else
        callback(false);

}

cardsets.Art = function(name){
    
    this.name = name;
    
};

cardsets.Art.prototype = new cardsets.Card();

cardsets.Art.prototype.check = function(callback){
    let checkName = this.name
    if(checkName === "藝文賞析教育")
        callback(true);
    else
        callback(false);

}
exports.cardset = cardsets;
