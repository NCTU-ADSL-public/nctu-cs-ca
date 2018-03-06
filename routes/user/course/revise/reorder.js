var utils = require('../../../../utils');
var reorder = {};

reorder.processOrder = function(req, res, next){

    if(req.session.profile){
            
        var courseResult = res.locals.courseResult;
        var reorderResult = [];
        var lanes = { lanes: [] };
        var taken = [];
        var repeatCounter = [];

        /*for(var i = 0; i<courseResult.length; i++)
            for(var u = 0; u<courseResult[i].course.length; u++)
                taken[courseResult[i].course[u].code] =  true;*/
        var sameCount = 0;


        var compulsory = {
                id: '共同必修',
                title: '共同必修',
                total:'',
                cards: []
        }
        var coreClass = {
                id: '核心課程',
                title: '核心課程',
                total:'',
                cards: []
        }
        var otherClass = {
                id: '副核心與他組核心',
                title: '副核心與他組核心',
                total:'',
                cards: []
        }
        var elective = {
                id: '專業選修',
                title: '專業選修',
                total:'',
                cards: []
        }
        var language = {
                id: '外語',
                title: '外語',
                total:'',
                cards: []
        }
        var general = {
                id: '通識',
                title: '通識',
                total:20,
                cards: []
        }
        var otherElect = {
                id: '其他選修',
                title: '其他選修',
                total:'',
                cards: []
        }
        var peClass = {
                id: '體育',
                title: '體育',
                total:6,
                cards: []
        }
        var service = {
                id: '服務學習',
                title: '服務學習',
                total:2,
                cards: []
        }
        var art  = {
                id: '藝文賞析',
                title: '藝文賞析',
                total:2,
                cards: []

        }
        var graduate = {
                id: '抵免研究所課程',
                title: '抵免研究所課程',
                total:0,
                cards: []
        }
        //compulsory
        for(var i = 0; i<courseResult.length; i++){
            if(i == 0)
                compulsory.total = courseResult[i].require;
            else if(i == 1)
                coreClass.total = courseResult[i].require;
            else if(i == 2)
                otherClass.total = courseResult[i].require;
            else if(i == 3)
                elective.total = courseResult[i].require;
            else if(i == 4)
                otherElect.total = courseResult[i].require;
            else if(i == 5)
                language.total = courseResult[i].require;
            else if(i == 6)
                general.total = courseResult[i].require;
            else if(i == 7)
                peClass.total = courseResult[i].require;
            else if(i == 8)
                service.total = courseResult[i].require;
            else if(i == 9)
                art.total = courseResult[i].require;
            else if(i == 10)
                graduate.total = courseResult[i].credit;
            
            for(var q = 0; q<courseResult[i].course.length; q++){
                var cosCode = courseResult[i].course[q].code;
                var cosInfo = {
                    id: '',
                    title: '',
                    label: '',
                    description: '',
                    cardStyle:{ borderRadius:6, boxShadow:'0 0 6px 1px #E08521', marginBottom: 15}
                }
                //if(!courseResult[i].course[q].code)
                    //cosInfo.id = 'DCP';
                //else{
                    cosInfo.id = courseResult[i].course[q].code;
                //}
                cosInfo.title = courseResult[i].course[q].cn + '(' + courseResult[i].course[q].en + ')';
                if(courseResult[i].course[q].complete == true){
                    cosInfo.label = courseResult[i].course[q].realCredit;
                    if(courseResult[i].course[q].reason == 'notCS'){
                        cosInfo.description = '尚未抵免此課程';
                        cosInfo.cardStyle = { borderRadius:6, boxShadow:'0 0 6px 1px #E08521', marginBottom: 15};
                    }
                    else{
                        cosInfo.description = courseResult[i].course[q].score;
                        cosInfo.cardStyle = { borderRadius:6, boxShadow:'0 0 6px 1px #41c836', marginBottom: 15};
                    }
                }
                else{
                    cosInfo.cardStyle = { borderRadius:6, boxShadow:'0 0 6px 1px #BD3B36', marginBottom: 15};;
                    if(courseResult[i].course[q].reason == 'now'){
                        cosInfo.description = '當期課程';
                    }
                    else
                        cosInfo.description = '未修此課程';
                }
                if(i == 0)
                    compulsory.cards.push(cosInfo);
                else if(i == 1)
                    coreClass.cards.push(cosInfo);
                else if (i ==2)
                    otherClass.cards.push(cosInfo);
                else if(i == 3)
                    elective.cards.push(cosInfo);
                else if(i == 4)
                    otherElect.cards.push(cosInfo);
                else if(i == 5)
                    language.cards.push(cosInfo);
                else if(i == 6)
                    general.cards.push(cosInfo);
                else if(i ==7)
                    peClass.cards.push(cosInfo);
                else if(i == 8)
                    service.cards.push(cosInfo);
                else if(i == 9)
                    art.cards.push(cosInfo);
                else if(i == 10)
                    graduate.cards.push(cosInfo);
            }
        }
        reorderResult.push(compulsory);
        reorderResult.push(coreClass);
        reorderResult.push(otherClass);
        reorderResult.push(elective);
        reorderResult.push(graduate);
        reorderResult.push(otherElect);
        reorderResult.push(language);
        reorderResult.push(general);
        reorderResult.push(peClass);
        reorderResult.push(service);
        reorderResult.push(art);
        lanes.lanes = reorderResult;
        //console.log("reorder result");
        //console.log(lanes.lanes[1]);
        
        res.locals.lanes = lanes;        
        //console.log(res.locals.lanes['lanes'][0]);
        next();

    }

     else
         res.redirect('/');

}



exports.reorder = reorder;
