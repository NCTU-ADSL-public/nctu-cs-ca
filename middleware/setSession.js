var session = require('client-sessions');
var randoms = require('../randomVals');

// for client session
module.exports.setSessions = function(req, res, next){
  session({
    cookieName: "session",
    secret: randoms.randomVals.sessionKey,
    httpOnly: true,
    secure: true,
    duration: 20 * 60 * 1000,
    activeDuration : 5 * 60 * 1000,
  });
}
