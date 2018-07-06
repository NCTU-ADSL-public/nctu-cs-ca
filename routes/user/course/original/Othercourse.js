var utils = require('../../../../utils');
var Othercourse = {};
Othercourse.processOther = function(req, res, next){
        
    if(req.session.profile){
        
        var courseResult = [];
        var compulsory = {
                title: '共同必修',
                credit: 0,
                require: 0,
                course: []
        }
        var coreClass = {
                title: '核心課程',
                credit: 0,
                require: 0,
                selection: false,
                course: []
        }
        var otherClass = {
                title: '副核心與他組核心',
                credit: 0,
                require: 0,
                selection: false,
                course: []
        }

        var elective = {
                title: '專業選修',
                credit: 0,
                require: 0,
                course: []
        }
        var language = {
                title: '外語',
                credit: 0,
                require: 8,
                course: []
        }
        var general = {
                title: '通識',
                credit: 0,
                require: 20,
                course: []
        }
        var otherElect = {
                title: '其他選修',
                credit: 0,
                require: 0,
                course: []
        }
        var peClass = {
                title: '體育',
                credit: 0,
                require: 6,
                course: []
        }
        var service = {
                title: '服務學習',
                credit: 0,
                require: 2,
                course: []
        }
        var art = {
                title: '藝文賞析',
                credit: 0,
                require: 2,
                course: []
        }
        var graduate = {
                title: '抵免研究所課程',
                credit: 0,
                course: []
        }
        var rules = JSON.parse(req.rules);       //get students' curricular rules
        var program = req.profile[0].program;    //get students' program
        var pass = JSON.parse(req.pass);         //get students' pass course
        var profile = JSON.parse(req.profile);   //get students' profile
       // console.log(pass);
        ////console.log(profile);
        var offset = JSON.parse(req.free);       //get students' courses that are waived
        var generalCourse = JSON.parse(req.general);   //get courses that can be used as general course
        var generalDetail = [];         //get general courses' detailes indexed by course code         
        var generalCheck = [];          //
        var free = [];
        var rule = [];
        var CSname = [];
        var notCS = [];
        var EnglishCourse = [];
        var dimension = [];
        var total = req.course.total;
        var studentId = res.locals.studentId
        var temp = parseInt(studentId.substring(0,2));
        // the year the student enter school
        var school_year = (100 + temp);
        var noEnglish = 0;
        var englishState = profile[0].en_certificate;
        //////console.log("en: "+englishState); 
        var englishFree = [];
        var advanceEnglish = 0;
        var basicEnglish = [];
        var compulseCodeCheck = [];
        var TeacherTime = [];
        var offsetNameCheck = [];
        var offsetTeacherTime = [];
        var offsetInfo = [];
        var offsetTaken = [];
        var offsetTakenCheck = [];
        var teacherOffsetCount = 0;
        var compulse = req.course.compulse;
        for(var i = 0; i<compulse.length; i++)
            for(var q = 0; q<compulse[i].cos_codes.length; q++)
                compulseCodeCheck[compulse[i].cos_codes[q]] = true;
        
        for(var i = 0; i<offset.length; i++){
            if(offset[i].score != null){
                if(offsetTaken[offset[i].cos_code] == true){
                    if(offset[i].cos_cname == '導師時間'){
                        teacherOffsetCount++;
                        offset[i].cos_code = offset[i].cos_code + '_' + teacherOffsetCount;
                        offsetInfo[offset[i].cos_code] = offset[i];   
                    }
                    else{ 
                        if(parseInt(offset[i].score) > parseInt(offsetInfo[offset[i].cos_code].score)){
                            offsetInfo[offset[i].cos_code] = offset[i];
                        }
                    }
                }
                else{
                    offsetInfo[offset[i].cos_code] = offset[i];
                    offsetTaken[offset[i].cos_code] = true;
                }
            }
            else{
                offsetInfo[offset[i].cos_code] = offset[i];
                offsetTaken[offset[i].cos_code] = true;
            }
        }
        for(var i = 0; i<offset.length; i++){
            offset[i] = offsetInfo[offset[i].cos_code];
            offsetNameCheck[offset[i].cos_cname] = true;
        }
        //the offset course
        for(var i = 0; i<offset.length; i++){
            if(offsetTakenCheck[offset[i].cos_code] != true){
            var cosInfo = {
                cn:'',
                en:'',
                score: -1,
                realCredit:0,
                reason: 'CS',
                complete:true,
                grade:'0',
                year: '',
                semester: ''
            };
            //////console.log(offset);
            var codeBrief = offset[i].cos_code.substring(0,3);
            cosInfo.complete = true;
            cosInfo.cn = offset[i].cos_cname;
            cosInfo.realCredit = parseInt(offset[i].credit);
            cosInfo.year = parseInt(offset[i].apply_year) - school_year + 1; 
            cosInfo.semester = parseInt(offset[i].apply_semester);
            if(offset[i].offset_type == '抵免')
                cosInfo.reason = 'free1';
            else if(offset[i].offset_type == '免修')
                cosInfo.reason = 'free2';
            if(offset[i].cos_type == '必修'){
                if(offset[i].cos_cname.substring(0,2) == '物理'){
                    cosInfo.realCredit = parseInt(offset[i].credit) - 1;
                    var cosAdd = JSON.stringify(cosInfo);
                    cosAdd =JSON.parse(cosAdd);
                    cosAdd.realCredit = 1;
                    elective.credit++;
                    elective.course.push(cosAdd);
                }
                if(codeBrief == 'ART'){
                    art.course.push(cosInfo);
                    art.credit += parseInt(offset[i].credit);
                }
                else if(offset[i].cos_cname == '服務學習(一)' || offset[i].cos_cname == '服務學習(二)'){
                    service.course.push(cosInfo);
                    service.credit += parseInt(offset[i].credit);
                }
                else{
                    if(offset[i].cos_cname == '導師時間')
                        //taken[cosInfo.code] = true;
                        offsetTeacherTime.push(cosInfo);
                    //compulsory.course.push(cosInfo);
                    //compulsory.credit += cosInfo.realCredit;
                }
                compulsory.course.push(cosInfo);
                compulsory.credit += cosInfo.realCredit;
            } 
            else if(offset[i].cos_type == '選修'){
                if(compulseCodeCheck[offset[i].cos_code] === true){
                    if(offset[i].cos_cname.substring(0,2) == '物理'){
                        cosInfo.realCredit = parseInt(offset[i].credit) - 1;
                        var cosAdd = JSON.stringify(cosInfo);
                        cosAdd =JSON.parse(cosAdd);
                        cosAdd.realCredit = 1;
                        elective.credit++;
                        elective.course.push(cosAdd);
                    }
                    compulsory.course.push(cosInfo);
                    compulsory.credit += cosInfo.realCredit;
                }
                else{
                    var temp = offset[i].cos_code.substring(0,3);
                    if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE' || temp == 'IDS'){
                        elective.course.push(cosInfo);
                        elective.credit += parseInt(offset[i].credit);
                    }
                    else{
                        otherElect.course.push(cosInfo);
                        otherElect.credit += parseInt(offset[i].credit);
                    }
                }
            }
            else if(offset[i].cos_type == '外語'){
                if(offset[i].cos_cname == '外語榮譽學分'){
                    englishFree.push(cosInfo);
                }
                else{
                    language.course.push(cosInfo);
                    language.credit += parseInt(offset[i].credit);
                }
            }
            else if(offset[i].cos_type == '通識'){
                cosInfo.dimension = offset[i].brief.substring(0,2);
                if(cosInfo.dimension == '當代')
                    dimension[0] = true;
                else if(cosInfo.dimension == '公民')
                    dimension[1] = true;
                else if(cosInfo.dimension == '群己')
                    dimension[2] = true;
                else if(cosInfo.dimension == '文化')
                    dimension[3] = true;
                else if(cosInfo.dimension == '歷史')
                    dimension[4] = true;
                else if(cosInfo.dimension == '自然')
                    dimension[5] = true;
                general.course.push(cosInfo);
                general.credit += parseInt(offset[i].credit);
            }
            else if(offset[i].cos_type == '服務學習'){
                service.course.push(cosInfo);
                service.credit += parseInt(offset[i].credit);
            }
            else if(offset[i].cos_type == '體育'){
                peClass.course.push(cosInfo);
                peClass.credit += parseInt(offset[i].credit);
            }
            offsetTakenCheck[offset[i].cos_code] = true;
            }
        }
        
        if(englishFree.length != 0){
            for(var i = 0; i<englishFree.length; i++){
                if(i != 0)
                    englishFree[0].realCredit += englishFree[i].realCredit;
            }
            englishFree[0].originalCredit = englishFree[0].realCredit;
            language.credit += parseInt(englishFree[0].realCredit);
            language.course.push(englishFree[0]);
        }
        //record what other courses could also be regarded as general courses   
        for(var g = 0; g<generalCourse.length; g++){
            generalCheck[generalCourse[g].cos_code] = true;
            generalDetail[generalCourse[g].cos_code] = generalCourse[g];
        }
        var w;
        compulsory.require = parseInt(rules[0].require_credit);
        coreClass.require = parseInt(rules[0].core_credit);
        otherClass.require = parseInt(rules[0].sub_core_credit);
        elective.require = parseInt(rules[0].pro_credit);
        otherElect.require = parseInt(rules[0].free_credit);
        language.require = parseInt(rules[0].foreign_credit);

        // revcord the courses in the cs table and cs courses' names
        for(var x = 0; x<total.length; x++){
            if(temp > 3){
                if(total[x].type == '必修'){
                    CSname[total[x].cos_cname] = true;
                    for(var a = 0; a<total[x].cos_codes.length; a++)
                        rule[total[x].cos_codes[a]] = true;
                }
            }
            else{
                CSname[total[x].cos_cname] = true;
                    for(var a = 0; a<total[x].cos_codes.length; a++)
                        rule[total[x].cos_codes[a]] = true;
            }
        }
          
        for(var q = 0; q<pass.length; q++){
            var cosInfo = {
                cn:'',
                en:'',
                score: -1,
                realCredit:0,
                reason: 'CS',
                complete:'0',
                grade:'0',
                year: '',
                semester: ''
             };
             var temp = pass[q].cos_code.substring(0,3);
             if(pass[q].pass_fail == '通過'){
                cosInfo.cn = pass[q].cos_cname;
                cosInfo.en = pass[q].cos_ename;
                cosInfo.complete = true;
                cosInfo.score = parseInt(pass[q].score);
                cosInfo.grade = pass[q].score_level;
                cosInfo.realCredit = parseInt(pass[q].cos_credit);
                cosInfo.year = parseInt(pass[q].year) - school_year + 1;
                cosInfo.semester = parseInt(pass[q].semester);
              }
              else
                cosInfo.complete = false;
              if(rule[pass[q].cos_code] != true){
                if(cosInfo.complete === true){
                    if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE'){
                        if(pass[q].cos_cname == '服務學習(一)' || pass[q].cos_cname == '服務學習(二)'){
                            if(offsetNameCheck[pass[q].cos_cname] == true);
                            else{
                            for(var w = 0; w< service.course.length; w++){
                                if(service.course[w].cn == pass[q].cos_cname){
                                    if(pass[q].score >= service.course[w].score)
                                        service.course[w] = cosInfo;
                                    break;
                                }
                            }
                            if(w == service.course.length){
                                service.credit += parseInt(pass[q].cos_credit);
                                service.course.push(cosInfo);
                            }
                            }
                        }
                        else{
                            if(pass[q].cos_cname != '導師時間'){
                                for(var x = 0; x< elective.course.length; x++){
                                    if(elective.course[x].cn == pass[q].cos_cname){
                                        if(pass[q].score >= elective.course[x].score)
                                            elective.course[x] = cosInfo;
                                        break;
                                    }
                                }
                                if(x == elective.course.length){
                                    if(pass[q].cos_typeext == '英文授課'){
                                        cosInfo.english = true;
                                        EnglishCourse.push(cosInfo);
                                    }
                                    elective.credit += parseInt(pass[q].cos_credit);
                                    elective.course.push(cosInfo);
                                 }
                             }
                             else{
                                 compulsory.course.push(cosInfo);
                                 compulsory.credit += parseInt(pass[q].cos_credit);
                             }
                         }
                     }
                     else if(temp == 'ART'){
                        art.credit += parseInt(pass[q].cos_credit);
                        art.course.push(cosInfo);
                     }
                     else{
                         if(pass[q].cos_type == '外語'){
                             var reg = pass[q].cos_cname.substring(0,4);
                             for(var h = 0; h< language.course.length; h++){
                                if(language.course[h].cn == pass[q].cos_cname){
                                    if(pass[q].score >= language.course[h].score)
                                        language.course[h] = cosInfo;
                                    break;
                                 }
                             }
                             if(h == language.course.length){
                                if(reg == '進階英文')
                                    advanceEnglish++;
                                else{
                                    if(pass[q].cos_cname == '大一英文（一）'){
                                        basicEnglish[0] = true;
                                     }
                                    else if(pass[q].cos_cname == '大一英文（二）')
                                        basicEnglish[1] = true;
                                }
                                if(englishState == '0'){
                                    if(advanceEnglish <=2){
                                        if(reg == '進階英文'){
                                            cosInfo.realCredit = 0;
                                            cosInfo.reason = 'english';
                                            //////console.log(cosInfo);
                                            language.course.push(cosInfo);
                                        }
                                        else{
                                            language.course.push(cosInfo);
                                            language.credit += parseInt(pass[q].cos_credit);
                                        }
                                    }
                                    else{
                                        language.course.push(cosInfo);
                                        language.credit += parseInt(pass[q].cos_credit);
                                    }
                                }
                                else{
                                     language.course.push(cosInfo);
                                     language.credit += parseInt(pass[q].cos_credit);
                                }
                            }
                        }
                        else if(pass[q].brief == '軍訓'){
                            cosInfo.originalCredit = 0;
                            cosInfo.realCredit = 0;
                            otherElect.course.push(cosInfo);
                        }
                        else if(pass[q].cos_type == '通識'){
                            var brief = pass[q].brief.substring(0,2);
                            cosInfo.dimension = brief;
                            for(var z = 0; z< general.course.length; z++){
                                if(general.course[z].cn == pass[q].cos_cname){
                                    if(pass[q].score >= general.course[z].score)
                                        general.course[z] = cosInfo;
                                    break;
                                }
                            }
                            if(z == general.course.length){
                                cosInfo.dimension = brief;
                                if(brief == '當代')
                                    dimension[0] = true;
                                else if(brief == '公民')
                                    dimension[1] = true;
                                else if(brief == '群己')
                                    dimension[2] = true;
                                else if(brief == '文化')
                                    dimension[3] = true;
                                else if(brief == '歷史')
                                    dimension[4] = true;
                                else if(brief == '自然')
                                    dimension[5] = true;
                                general.course.push(cosInfo);
                                general.credit += parseInt(pass[q].cos_credit);
                                if(pass[q].cos_typeext == '服務學習'){
                                    var cosInfoNew = JSON.stringify(cosInfo);
                                    cosInfoNew = JSON.parse(cosInfoNew);
                                    cosInfoNew.realCredit = 0;
                                    service.course.push(cosInfoNew);
                                }
                                    
                            }
                         }
                         else{
                            if(temp == 'PYY'){
                                peClass.course.push(cosInfo);
                                peClass.credit += parseInt(pass[q].cos_credit);
                            }
                            else{
                                if(pass[q].cos_typeext == '服務學習'){
                                    if(pass[q].cos_cname == '服務學習(一)')
                                        cosInfo.reason = 'notCS';
                                    service.course.push(cosInfo);
                                    service.credit += parseInt(pass[q].cos_credit);
                                }
                                /*else if(pass[q].cos_cname == '導師時間'){
                                    compulsory.course.push(cosInfo);
                                    compulsory.credit += parseInt(pass[q].cos_credit);
                                }*/
                                else{
                                    if(pass[q].cos_cname != '導師時間'){
                                        for(var m = 0; m< otherElect.course.length; m++){
                                            if(otherElect.course[m].cn == pass[q].cos_cname){
                                                if(pass[q].score >= otherElect.course[m].score)
                                                    otherElect.course[m] = cosInfo;
                                                break;
                                            }
                                        }
                                        if(m == otherElect.course.length){
                                            if(CSname[cosInfo.cn] == true){
                                                cosInfo.complete = true;
                                                cosInfo.reason = 'CS';
                                                notCS[cosInfo.cn] = true;
                                                notCS[cosInfo.cn] = true;
                                                free[cosInfo.cn] = cosInfo;
                                            }
                                            if(generalCheck[pass[q].cos_code] === true){
                                                cosInfo.dimension = generalDetail[pass[q].cos_code].brief.substring(0,2);
                                                cosInfo.reason = 'general';
                                            }    
                                            otherElect.course.push(cosInfo);
                                            otherElect.credit += parseInt(pass[q].cos_credit);
                                        }
                                    }
                                    else{
                                        if(CSname[cosInfo.cn] == true){
                                            cosInfo.complete = true;
                                            cosInfo.reason = 'CS';
                                            notCS[cosInfo.cn] = true;
                                            notCS[cosInfo.cn] = true;
                                            free[cosInfo.cn] = cosInfo;
                                        }
                                        TeacherTime.push(cosInfo);
                                        otherElect.course.push(cosInfo);
                                        otherElect.credit += parseInt(pass[q].cos_credit);
                                    }
                                 }
                             }
                         }
                      }
               }
          }

       }
       
       if(englishState == '3' || englishState == '4' || englishState == '0'){
           ////console.log(englishState);
           for(var i = 0; i<2; i++){
            if(basicEnglish[i] != true){
                var cosInfo = {
                    cn:'',
                    en: '',
                    score: -1,
                    realCredit:0,
                    reason:'CS',
                    complete:false,
                    grade:'0',
                    year:'',
                    semester:''
                }; 
                if(i == 0){
                    cosInfo.cn = '大一英文（一）';
                    cosInfo.en = 'Freshman English (I)';
                }
                else{
                    cosInfo.cn = '大一英文（二）';
                    cosInfo.en = 'Freshman English (II)';
                }
                language.course.push(cosInfo);
            }
         }
       }
       
      // console.log(elective);
       courseResult.push(compulsory);
       courseResult.push(coreClass);
       courseResult.push(otherClass);
       courseResult.push(elective);
       courseResult.push(otherElect);
       courseResult.push(language);
       courseResult.push(general);
       courseResult.push(peClass);
       courseResult.push(service);
       courseResult.push(art);
       courseResult.push(graduate);
      }
      else {
        res.redirect('/');
      }
      res.locals.courseResult = courseResult;
      res.locals.English = EnglishCourse;
      res.locals.notCS = notCS;
      res.locals.free = free;
      res.locals.dimension = dimension;
      res.locals.teacher = TeacherTime;
      res.locals.offsetTeacher = offsetTeacherTime;
      next();
}


exports.Othercourse = Othercourse;
