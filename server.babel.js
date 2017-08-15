var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var session = require('client-sessions');

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(session({
  cookieName: 'session',
  secret: 'lalalaldfgshsfglk45ngfsjlkfgh2435jl',
  duration: 40 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
}));
app.use('/Head', express.static('./build'));
app.use('/Login', express.static('./build'));
app.use('/', express.static('./build'));
var port = 3000;
var server = app.listen(3000, function(){
        console.log("http://localhost:" + port);
})

var url = "https://id.nctu.edu.tw/o/authorize/?client_id=h0gpKBJOxUr76R9nTYBGk9IFa1jkXFxi8EJsD6GV&response_type=code&scope=profile%20name";

var oAuthNctu = {
    grant_type : "authorization_code",
    client_id : "h0gpKBJOxUr76R9nTYBGk9IFa1jkXFxi8EJsD6GV",
    client_secret : "jAWuok0zGrpNsDEjGTch9iIObqJEuUDCcdcs35QY9D2d1EIRbWY4A52F4kC3pQoGh6MND2IaWM5bIq4ty74NNWmrXuY7K2Qh2gUvD6D2gDgDmWuELB5QS75URZwJ9Wx0",
    redirect_uri : "http://csca.nctu.edu.tw:3000/auth/Nctu/callback"
}
app.get('/auth/Nctu', function(req, res) {
    res.redirect('https://id.nctu.edu.tw/o/authorize/?client_id=h0gpKBJOxUr76R9nTYBGk9IFa1jkXFxi8EJsD6GV&response_type=code&scope=profile%20name');
});

app.get('/students/info', function(req, res) {
    res.send(req.session.profile);
});
function getCode(req, res, next){
	oAuthNctu.code = req.query.code;
	if(!oAuthNctu.code){
		console.log("Did not recieve code.");
		res.redirect('/');
		return;
	}
	console.log(oAuthNctu.code);

	var formData = {
		grant_type : oAuthNctu.grant_type,
		code: 'hihihihihih',
		//code : oAuthNctu.code,
		client_id : oAuthNctu.client_id,
		client_secret : oAuthNctu.client_secret,
		redirect_uri : oAuthNctu.redirect_uri
	};
	// Todo: if wrong code
	request({
		uri: 'https://id.nctu.edu.tw/o/token/',
		method: "POST",
		headers: {
			'Content-Type': 'multipart/form-data'
		},	
		formData: formData
	}, function(err, res, body){
		console.log(body);	
		var bodyObj = JSON.parse(body);
		var access_token = bodyObj.access_token;
		console.log(access_token);
		oAuthNctu.token = access_token;
		//if(!access_token){
		//	res.redirect('/');
		//	return;
		//}
		//else
		
		//res.locals.access_token = access_token;
		//I think we should pass token like above but I can't
		next();
	});
}

function getProfile(req, res, next){
    request({
    	uri: 'https://id.nctu.edu.tw/api/profile/',
    	method: "GET",
    	headers: {
      	'Authorization' : 'Bearer ' + oAuthNctu.token,
    },
  	}, function(err, res, body){              				       
        console.log('Profile: ' +  body);
	//req.session = body;
        //console.log('getProfile checkpoint: ' + req.session.profile);   
	req.session.profile = body; 
	next();
   });
}

function redirectAfterAuth(req, res){
	res.redirect('/Head');
}

app.get('/auth/Nctu/callback', getCode, getProfile, redirectAfterAuth);

