require('babel-register');
require('./server.babel');/*
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var sessions = require('client-sessions');

var app = express();
app.set('view engine', 'jade');
app.locals.pretty = true;
//app.use(express.static(`/build`));
// Source code will be organized

// Middleware
app.use(bodyParser.json());
app.use(sessions({
  cookieName: 'session',
  secret: 'lalalaldfgshsfglk45ngfsjlkfgh2435jl',
  duration: 40 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
}));

/*	
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

app.get('/', function(req, res) {
	res.render('index.jade');
});

app.get('/auth/Nctu', function(req, res) {
    res.redirect('https://id.nctu.edu.tw/o/authorize/?client_id=h0gpKBJOxUr76R9nTYBGk9IFa1jkXFxi8EJsD6GV&response_type=code&scope=profile%20name');
});

app.get('/auth/Nctu/callback', function(req, res) {
	
	var code = req.query.code;
	if(code)
		oAuthNctu.code = code;
	else
		res.redirect('/');
	console.log(oAuthNctu.code);


	var formData = {
		grant_type : oAuthNctu.grant_type,
		code : oAuthNctu.code,
		client_id : oAuthNctu.client_id,
		client_secret : oAuthNctu.client_secret,
		redirect_uri : oAuthNctu.redirect_uri
	};

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
		if(!access_token)
			res.redirect('/');
		else
			getProfile(req, res, access_token);
	});
	res.redirect('/');

});

function getProfile(req, res, access_token){
	request({
    	uri: 'https://id.nctu.edu.tw/api/profile/',
    	method: "GET",
    	headers: {
      	'Authorization' : 'Bearer ' +  access_token 
    },
  	}, function(err, res, body){              				       
    	console.log(body);
    	req.session.profile = body;
  }
  );
}*/
