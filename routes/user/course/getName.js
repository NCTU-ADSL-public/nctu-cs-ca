var utils = require('../../../utils');
var getName = {};

getName.Name = function(req, res, next){
            
       
            if(req.session.profile){
              // res.locals.Name = '郭羽喬';       
               res.locals.Name = utils.getPersonName(JSON.parse(req.session.profile));
                                           
                 next();
             }
             else
                res.redirect('/');
}

exports.getName = getName;

