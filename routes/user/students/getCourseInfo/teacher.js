const request = require('request');

class Teacher {
    constructor(name){
        this.name = name;   
        this.codes = [];
        this.stuNum = [];
        this.stuLimit = [];
        this.english = [];
        this.time = [];
        this.photo = '';
        /*
        this.setPhoto(name, function(name){
             this.photo = 'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/' + name + '.jpg';
        });*/
    }
    addCodes(code) {
        this.codes.push(code);
    }
    addStuNum(stuNum) {
        this.stuNum.push(stuNum);
    }
    addStuLimit(stuLimit) {
        this.stuLimit.push(stuLimit);
    }
    addTime(time) {
        this.time.push(time);
    }
    addEnglish(english) {
        this.english.push(english);
    }
    updateAll(code, stuNum, stuLimit, time, english){
        this.addCodes(code);
        this.addStuNum(stuNum);
        this.addStuLimit(stuLimit);
        this.addTime(time);
        this.addEnglish(english);
    }
    setPhoto(name, callback){
        var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(__dirname + '/matchName.txt')
        });
        let engName;
        let findName;
        lineReader.on('line', function (line) {
            if(line == name){
                findName = engName;
            }
            engName = line;
        }).on('close', function(){
            callback(findName);
        });
    }
}

module.exports = Teacher;
