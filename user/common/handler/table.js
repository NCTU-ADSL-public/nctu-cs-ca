var table = {};
var nodemailer = require('nodemailer');
var query = require('../../../../db/msql');

table.mailSend = function(req, res, next){
    if(req.session.profile){
        
        var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nctucsca@gmail.com',
            pass: 'axc3262757'
        }
        });
        
        var options = {
            //寄件者
            from: 'nctucsca@gmail.com',
            //收件者
            to: req.body.receiver_email, 
            //副本
            cc: req.body.sender_email,
            //密件副本
            bcc: '',
            //主旨
            subject: req.body.title, // Subject line
            //純文字
            /*text: 'Hello world2',*/ // plaintext body
            //嵌入 html 的內文
            html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請聯絡：' + req.body.name +' () 先生/小姐 '+ req.body.sender_email +'謝謝。</p><p>This message is automatically sent by e3 system, please do not reply directly! If you have any questions, please contact with Mr/Ms. '+ req.body.name +'()'+req.body.sender_email+'.</p><p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p><p>'+req.body.content+'</p>'
            //附件檔案
            /*attachments: [ {
                filename: 'text01.txt',
                content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
            }]*/
        };
        
        transporter.sendMail(options, function(err, info){
            if(err){
                throw err;
            }
        });
         var mailContent = {sender_id : req.body.sender_id , title :req.body.title, receiver_id: req.body.receiver_id, content: req.body.content};
         query.CreateMail(mailContent);

         var signal = {signal:1};
         req.signal = signal;
         if(req.signal)
            	next();
        	else
            	return;
    }
    else
      res.redirect('/');
}

table.mailSent = function(req, res, next){
    if(req.session.profile){ 
        query.ShowMailSendList(req.body.id, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
            	result = JSON.parse(result);
            	req.sent = result;
        		if(req.sent)
            		next();
        		else
            		return;
            }
        });
   }
    else
        res.redirect('/');
}

table.mailInbox = function(req, res, next){
    if(req.session.profile){     
        query.ShowMailRcdList(req.body.id, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
            	result = JSON.parse(result);
            	req.inbox = result;
        		if(req.inbox)
            		next();
        		else
            		return;
            }
        });    
    }
    else
         res.redirect('/');
}

table.mailInfo = function(req, res, next){
    if(req.session.profile){     
        query.ShowMailInfo(req.body.mail_id, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
            	result = JSON.parse(result);
            	req.info = result;
        		if(req.info)
            		next();
        		else
            		return;
            }
        });    
    }
    else
         res.redirect('/');
}

exports.table = table;
