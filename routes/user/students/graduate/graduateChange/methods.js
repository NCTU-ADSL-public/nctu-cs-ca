var cards = require('./cardType').cardset;
var query = require('../../../../../db/msql');
var Compulsory = cards.Compulsory;
var Core = cards.Core;
var SecondaryCore = cards.SecondaryCore;
var Elective = cards.Elective;
var Language = cards.Language;
var General = cards.General;
var PE = cards.PE;
var Art = cards.Art;
var Serve = cards.Serve;
var Card = cards.Card;
var methods = {};



var insertToDB = function(req, res){

    let cardData = req.body.check;
    let cardCode = cardData.code.cardId;
    let cardTarget = cardData.next.targetLaneId
    let cardIni = cardData.pre.sourceLaneId
    let studentId = res.locals.studentId;
    query.insertCosMotion(studentId, cardCode, cardIni, cardTarget);
}

methods.checkCard = function(req, res){

    let cardData = req.body.check;
    //console.log(cardData);
    let cardName = cardData.cosname.id;
    let cardCode = cardData.code.cardId;
    let cardType = cardData.type.type;
    let cardTarget = cardData.next.targetLaneId
    let studentId = req.profile[0].student_id;
    let theCard;

    switch(cardTarget){
        case "共同必修":
            theCard = new Compulsory(cardCode, cardType, studentId);
            break;
        case "核心課程":
            theCard = new Core(cardCode, cardType, studentId);
            break;
        case "副核心與他組核心":
            theCard = new SecondaryCore(cardCode, cardType, studentId);
            break;
        case "專業選修":
            theCard = new Elective(cardCode, cardName);
            break;
        case "其他選修":
            theCard = new Card(cardCode); // All courses can move here
            break;
        case "外語":
            theCard = new Language(cardType); // All courses can move here
            break;
        case "通識":
            theCard = new General(cardCode, cardType); 
            break;
        case "體育":
            theCard = new PE(cardCode); 
            break;
        case "服務學習":
            theCard = new Serve(cardType); 
            break;
        case "藝文賞析":
            theCard = new Art(cardName); 
            break;
        default:
            theCard = new Card(cardCode);
            break;
    }
    

    let checkResult = { check:{ flag:'', reason: [] } };
    checkResult.check.reason = null;
    theCard.check(function(flag){
        if(flag){
            checkResult.check.flag = true;
            //insertToDB(req, res);
        }
        else            
            checkResult.check.flag = false;
        res.json(checkResult);
    });
    
}  


exports.method = methods;
