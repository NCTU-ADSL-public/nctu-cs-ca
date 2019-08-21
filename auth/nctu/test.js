var nodemailer = require('nodemailer');
var mail_info = require('./mail_info');
//console.log(mail_info.auth);
var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: mail_info.auth
                });
              
                var options = {
                    //寄件者
                    from: 'nctucsca@gmail.com',
                    //收件者
                    to: /*mailString*/'joying62757@gmail.com', 
                    //副本
                    cc: /*req.body.sender_email*/'',
                    //密件副本
                    bcc: '',
                    //主旨
                    subject: '[交大資工線上助理]專題申請狀態改變通知', // Subject line
                    //純文字
                    /*text: 'Hello world2',*/ // plaintext body
                    //嵌入 html 的內文
                    html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請直接聯絡 老師：' + ',學生：' + '謝謝。</p><br/><p>申請狀態已變更, 請進入交大資工線上助理確認申請表狀態：<a href = "https://csca.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
                    //附件檔案
                    /*attachments: [ {
                        filename: 'text01.txt',
                        content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
                    }]*/
                };
                
                transporter.sendMail(options, function(error, info){
                    if(error){
                        console.log(error);
                    }
                });

