var cards = require('./cardType').cardset;
var Compulsory = cards.Compulsory;
var Elective = cards.Elective;
var Language = cards.Language;
var General = cards.General;
var PE = cards.PE;
var Art = cards.Art;
var Serve = cards.Serve;
var Card = cards.Card;
var Graduate = cards.Graduate;
var AdditionProgram = cards.AdditionProgram;
var methods = {};
var allGroup = [/*"共同必修", */"專業選修", "其他選修", "外語", "通識", "體育", "服務學習", "藝文賞析", "抵免研究所課程", "雙主修、輔系、學分學程"];
//var getStudentId = require('../../../course/getStudentId');
//var studentId = getStudentId.getStudentId.studentId;


/*var insertToDB = function(req, res){

    let cardData = req.body.check;
    let cardCode = cardData.code.cardId;
    let cardTarget = cardData.next.targetLaneId
    let cardIni = cardData.pre.sourceLaneId
    let studentId = res.locals.studentId;
    query.insertCosMotion(studentId, cardCode, cardIni, cardTarget);
}*/

methods.checkCard = function(req, res){
    var canMoveGroup = [];
    var cantMove = [];
    let cardData = req.body;
    //console.log(cardData);
    //let cardData = {cosname: {id:"物理一作業演算"}, code: {cardId: "DCP1115"}, type: {type: "必修"}};
    //let enStatus = "0";
    let cardName = cardData.cn; //cardData.cosname.id;
    let cardCode = cardData.code; //cardData.code.cardId;
    let cardType = cardData.type; //cardData.type.type;
    let studentId = cardData.studentId;
    let cardTarget = '';// = cardData.next.targetLaneId
    //let studentId = req.profile[0].student_id;
    let theCard = '';
    for(let i = 0; i < allGroup.length; i++){
        cardTarget = allGroup[i];
        //console.log(cardTarget);
        switch(cardTarget){
            /*case "共同必修":
                theCard = new Compulsory(cardCode, cardType, studentId);
                //console.log(1);
                break;*/
            case "專業選修":
                theCard = new Elective(cardCode, cardName, cardType, studentId);
                //console.log(2);
                break;
            case "其他選修":
                theCard = new Card(cardCode, cardName, cardType, studentId); // All courses can move here   // not now 
                //console.log(3);
                break;
            case "外語":
                theCard = new Language(cardType); // All courses can move here
                //console.log(4);
                break;
            case "通識":
                //theCard = new General(cardCode, cardName, cardType, studentId); 
                theCard = new General(cardCode, studentId);
                //console.log(5);
                break;
            case "體育":
                theCard = new PE(cardCode); 
                //console.log(6);
                break;
            case "服務學習":
                theCard = new Serve(cardType); 
                //console.log(7);
                break;
            case "藝文賞析":
                theCard = new Art(cardName); 
                //console.log(8);
                break;
            case "抵免研究所課程":
                theCard = new Graduate(cardCode, cardType);
                break;
            case "雙主修、輔系、學分學程":
                theCard = new AdditionProgram(cardType);
                break;
            default:
                //theCard = new Card(cardCode);
                break;
        }
        //let checkResult = {title: ''};
        //checkResult.title = allGroup[i];
        let countGeneral = 0;
        theCard.check(function(flag){
            if (cardCode === '') {
                cantMove.push({title: flag});
            } else {
                if(flag != ''){
                    if(flag.substring(0,2) == '通識'){
                        let dimension = flag.split('|');
                        let old = dimension[0].split('/');
                        old = old[0];
                        let new_ = dimension[1];
                        let new_one = new_.split(',');
                        for(let i = 0; i < new_one.length; i++){
                            let one = new_one[i];
                            one = one.substring(0, one.length-5);
                            canMoveGroup.push({title: one});
                            countGeneral++;
                        }
                        old = old.substring(0, old.length);
                        canMoveGroup.push({title: old});
                    }
                    else
                        canMoveGroup.push({title: flag});
                }
                else
                    cantMove.push({title: flag});
            }
            //console.log(canMoveGroup);
            /*if(flag){
                canMoveGroup.push(checkResult);
                console.log(canMoveGroup);
            }
            else{            
                cantMove.push(checkResult);
            }*/
            if((canMoveGroup.length + cantMove.length - countGeneral) == allGroup.length){
                console.log(canMoveGroup);
                res.send(canMoveGroup);
            }
        });
    }
}

exports.method = methods;
