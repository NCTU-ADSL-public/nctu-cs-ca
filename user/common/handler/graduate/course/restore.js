var restore = {};

restore.processRestore = function(req, res, next){
    
    if(req.session.profile){
        var studentId = res.locals.studentId;
        var courseResult = res.locals.courseResult;
        //console.log(courseResult[0]);

        var courses = req.changeCourses;
        courses = JSON.parse(courses);
        //console.log("change courses:");
        //console.log(courses);
        var restore = [];
        var restoreIndex = [];
        var tempPre = [];
        var tempNext = [];
        
        for(var i = 0; i<11; i++){
            var course = {
                pre:[],
                next:[]
            }
            restore.push(course);
        }
        for(var i = 0; i<11; i++){
            var course = {
                pre:[],
                next:[]
            }
            restoreIndex.push(course);
        }
        for(var i = 0; i<courses.length; i++){
            if(courses[i].now_pos == '...') continue;
            if(courses[i].orig_pos == null) continue;
            if(courses[i].orig_pos == '共同必修'){
                restore[0].pre[courses[i].cos_cname] = true;
                restoreIndex[0].pre.push(courses[i].cos_cname);    
            }
            else if(courses[i].orig_pos == '專業選修'){
                restore[1].pre[courses[i].cos_cname] = true;
                restoreIndex[1].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '其他選修'){
                restore[2].pre[courses[i].cos_cname] = true;
                restoreIndex[2].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '外語'){
                restore[3].pre[courses[i].cos_cname] = true;
                restoreIndex[3].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos.substring(0,2) == '通識'){
                restore[4].pre[courses[i].cos_cname] = true;
                restoreIndex[4].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '體育'){
                restore[6].pre[courses[i].cos_cname] = true;
                restoreIndex[6].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '服務學習'){
                restore[7].pre[courses[i].cos_cname] = true;
                restoreIndex[7].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '藝文賞析'){
                restore[8].pre[courses[i].cos_cname] = true;
                restoreIndex[8].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '抵免研究所課程'){
                restore[9].pre[courses[i].cos_cname] = true;
                restoreIndex[9].pre.push(courses[i].cos_cname);
            }
            else if(courses[i].orig_pos == '雙主修、輔系、學分學程'){
                restore[10].pre[courses[i].cos_cname] = true;
                restoreIndex[10].pre.push(courses[i].cos_cname);
            }
            if(courses[i].now_pos == '共同必修'){
                restore[0].next[courses[i].cos_cname] = true;
                restoreIndex[0].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '專業選修'){
                restore[1].next[courses[i].cos_cname] = true;
                restoreIndex[1].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '其他選修'){
                restore[2].next[courses[i].cos_cname] = true;
                restoreIndex[2].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '外語'){
                restore[3].next[courses[i].cos_cname] = true;
                restoreIndex[3].next.push(courses[i].cos_cname);
            } 
            else if(courses[i].now_pos.substring(0,2) == '通識'){
                restore[4].next[courses[i].cos_cname] = true;
                restoreIndex[4].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '體育'){
                restore[6].next[courses[i].cos_cname] = true;
                restoreIndex[6].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '服務學習'){
                restore[7].next[courses[i].cos_cname] = true;
                restoreIndex[7].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '藝文賞析'){
                restore[8].next[courses[i].cos_cname] = true;
                restoreIndex[8].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '抵免研究所課程'){
                restore[9].next[courses[i].cos_cname] = true;
                restoreIndex[9].next.push(courses[i].cos_cname);
            }
            else if(courses[i].now_pos == '雙主修、輔系、學分學程'){
                restore[10].next[courses[i].cos_cname] = true;
                restoreIndex[10].next.push(courses[i].cos_cname);
            }
        }
       //console.log(restore);
       //console.log(restoreIndex);
       //console.log(courseResult[6]);
       var general_old_dim = [];
       var general_new_dim = [];
       for(var i = 0; i<courseResult.length; i++){
        if(i == 5) continue;
        for(var q = 0; q<courseResult[i].course.length; q++){
           /*if(courseResult[i].course[q].code == 'DBT1103'){
               console.log("i" + i+" p: "+q);
               console.log(courseResult[i].course[q]);
           }*/
            if(restore[i].pre[courseResult[i].course[q].cn] == true){
               restore[i].pre[courseResult[i].course[q].cn] = false;
             /*  if(i == 3){
                console.log("in first loop");
                console.log("i:" + i + " p: " + q);
                console.log(courseResult[i].course[q].code);
               }*/
                tempPre[courseResult[i].course[q].cn] = courseResult[i].course[q];
                //console.log( tempPre[courseResult[i].course[q].code]); 
                courseResult[i].credit -= parseFloat(courseResult[i].course[q].realCredit);
                if(i == 4) {
                    courseResult[5].credit.total -= parseFloat(courseResult[i].course[q].realCredit);
                    /*if(courseResult[i].course[q].brief_new.substring(0,2) == '核心')
                        courseResult[5].credit.core -= parseFloat(courseResult[i].course[q].realCredit);
                    else if(courseResult[i].course[q].brief_new.substring(0,2) == '跨院')
                        courseResult[5].credit.cross -= parseFloat(courseResult[i].course[q].realCredit);
                    else if(courseResult[i].course[q].brief_new.substring(0,2) == '校基')
                        courseResult[5].credit.basic -= parseFloat(courseResult[i].course[q].realCredit);
                    */
                    let gen_name = courseResult[i].course[q].cn 
                    for(var k = 0; k < courseResult[5].course.length; k++){
                        if(gen_name == courseResult[5].course[k].cn){
                            general_old_dim[gen_name] = courseResult[i].course[q].dimension;
                            general_new_dim[gen_name] = courseResult[5].course[k].dimension;
                            if(courseResult[5].course[k].dimension.substring(0,2) == '核心')
                                courseResult[5].credit.core -= parseFloat(courseResult[i].course[q].realCredit);
                            else if(courseResult[5].course[k].dimension.substring(0,2) == '跨院')
                                courseResult[5].credit.cross -= parseFloat(courseResult[i].course[q].realCredit);
                            else if(courseResult[5].course[k].dimension.substring(0,2) == '校基')
                                courseResult[5].credit.basic -= parseFloat(courseResult[i].course[q].realCredit);
                            break;
                        }
                    }
                    courseResult[5].course.splice(k,1);
                }
                courseResult[i].course.splice(q,1);
                q--;
            }
        }
       }
      // console.log(tempPre);
       //push the course the course in next to the new position
       for(var i = 0; i<courseResult.length; i++){
        if(i == 5) continue;
        for(var q = 0; q<restoreIndex[i].next.length; q++){
                //console.log("i:" + i + " q:" + q);
                if(typeof(tempPre[restoreIndex[i].next[q]]) != undefined && tempPre[restoreIndex[i].next[q]] ){
                    if(i == 4){
                        courseResult[i].credit += parseFloat(tempPre[restoreIndex[i].next[q]].realCredit);
                        courseResult[5].credit.total += parseFloat(tempPre[restoreIndex[i].next[q]].realCredit);
                        let temp_general_old = Object.assign({}, tempPre[restoreIndex[i].next[q]]);
                        let temp_general_new = Object.assign({}, tempPre[restoreIndex[i].next[q]]);
                        temp_general_old.dimension = general_old_dim[restoreIndex[i].next[q]];
                        if (temp_general_old.dimension == null) temp_general_old.dimension = '自然';
                        temp_general_new.dimension = general_new_dim[restoreIndex[i].next[q]];
                        if (temp_general_new.dimension == null) temp_general_new.dimension = '校基本素養';
                        courseResult[i].course.push(temp_general_old);
                        courseResult[5].course.push(temp_general_new);
                        if(temp_general_new.dimension.substring(0,2) == '核心')
                            courseResult[5].credit.core += parseFloat(courseResult[i].course[q].realCredit);
                        else if(temp_general_new.dimension.substring(0,2) == '跨院')
                            courseResult[5].credit.cross += parseFloat(courseResult[i].course[q].realCredit);
                        else if(temp_general_new.dimension.substring(0,2) == '校基')
                            courseResult[5].credit.basic += parseFloat(courseResult[i].course[q].realCredit);
                    }
                    else {
                        courseResult[i].course.push(tempPre[restoreIndex[i].next[q]]);
                        courseResult[i].credit += parseFloat(tempPre[restoreIndex[i].next[q]].realCredit);
                    }
                }
                //else{
                    
                  //  console.log(studentId + ": " + restoreIndex[i].next[q]);
                //}
            }
        }
       res.locals.courseResult = courseResult;
    }
    else
        res.redirect('/');
    next();

}

exports.restore = restore;
