var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var table = require('./handler/table');

var mailSend = table.table.mailSend;
var mailSent = table.table.mailSent;
var mailInbox = table.table.mailInbox;
var mailInfo = table.table.mailInfo;

/*寄送郵件*/
router.post('/common/mail/send' , csrfProtection, mailSend, function(req, res){
    res.send(req.signal);

});

/*寄件備份匣*/
router.post('/common/mail/sent', csrfProtection, mailSent, function(req, res){
    res.send(req.sent);

});

/*收件匣*/
router.get('/common/mail/inbox', csrfProtection, mailInbox, function(req, res){

    res.send(req.inbox);

});

/*單一郵件資訊以及內容*/
router.post('/common/mail/info', csrfProtection, mailInfo, function(req, res){
    res.send(req.info);
});
module.exports = router;
