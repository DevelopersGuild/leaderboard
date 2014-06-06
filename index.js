var express = require('express'),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    fs = require('fs'),
    nodeStatic = require('node-static'),
    file = new nodeStatic.Server('./public'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'); // for app.post
    crypto = require('crypto'); //Module for Hashing
    hasher = crypto.createHash('sha1');//Algorithm for hashing completely arbitrary
    GitHubApi = require('github');
    var githublel = require('octonode');


var github = new GitHubApi({
    // required
    version: "3.0.0"
  });

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/leaderboard');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {


  // var user = new models.Users({
  //   email: 'test'+Math.floor(Math.random()*1000)+'@test.com',
  //   name : {
  //     first: 'bob',
  //     last : 'doe'
  //   }
  // });

  // user.save(function (err, user) {
  //   if (err) return console.error(err);
  //   console.dir(user)
  // });
});

  var models = require('./app/models/model')(mongoose);



console.log("hello!");

    process.env.NODE_ENV = "development";

    var config = {
        fs : {
            publicDir: "./public"
        }
    }

var app = express(),
    publicDir = path.join(__dirname, config.fs.publicDir);

// app.configure("production", function() {
    app.set('port', 22223);


    // app.use(express.logger('dev'));


    // app.use(express.bodyParser()); //parses json, multi-part (file), url-encoded
    // app.use(app.router); //need to be explicit, (automatically adds it if you forget)
    // app.use(express.static(clientDir)); //should cache static assets
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {

    // file.serve(req, res);

     res.send('hello world');

     console.dir(app)

     var obj = {
     	foo: "bar",
     	bob: "doe",
     	sayFoo: function( ) {
     		console.log(this.foo)
     	}
     }

     obj.sayFoo();

     // console.dir(req)

    // if (req.url.indexOf('\0') !== -1) {
    //     return respond('That was evil.');
    // }

    // fs.exists(path.join(publicDir, req.url), function(exists) {
    //     if (exists) {
    //         res.sendfile(path.join(publicDir, req.url));
    //     } else {
    //         res.send('404');
    //     }
    // });
});






app.get('/login', function(req, res) {
    res.sendfile(path.join(publicDir, '/login.html'));
});

app.post('/login', function(req, res) {
    //res.writeHead(200,{'Content-Encoding':'utf-8'});
    var username = req.body.email,
        password = req.body.password;
    var hashedPassword = crypto.pbkdf2Sync(password,"DevelopersGuildTheSalt",999,16) ;
    var theUser;
    var err;
    models.Users.findOne({email: username}, function(err, theUser){
    if(err){console.log(err);}
	if(theUser != null){
	if(theUser.password == hashedPassword){
    res.send("Login Successful!  ")	;	



      var OAuth2 = require('simple-oauth2')({
      clientID: '586c76f27924fdc54e17',
      clientSecret: '447dfc9b784cf4a224d055420d34896fa440fbe0',
      site: 'https://github.com/login',
      tokenPath: '/oauth/access_token'
      });

      // Authorization uri definition
      var authorization_uri = OAuth2.AuthCode.authorizeURL({
      redirect_uri: 'http://localhost:22223/callback',
      scope: 'notifications, user',
      state: '3(#0/!~'
      });

      // Initial page redirecting to Github
      app.get('/auth', function (req, res) {
      res.redirect(authorization_uri);
      });

      // Callback service parsing the authorization token and asking for the access token
      app.get('/callback', function (req, res) {
      var code = req.query.code; 
      console.log('/callback');
      OAuth2.AuthCode.getToken({
      code: code,
      redirect_uri: 'http://localhost:22223/callback'
      }, saveToken);

      function saveToken(error, result) {
        if (error) { console.log('Access Token Error', error.message); }
          token = OAuth2.AccessToken.create(result);
          res.send('Access Granted. Github token created');

       
        console.log(token.token['access_token']);
        var client = githublel.client('f2ea7352a4ceda5c9a79079ccf3e5e5406169f67');

        client.get('/user', {}, function (err, status, body, headers) {
        console.log(body); //json object
        });   
        }

        

      });

















    //github.authenticate({
    //type: "oauth",
    //token: token
    //});
    //github.authorization.create({
    //scopes: ["user", "public_repo", "repo", "repo:status", "gist"],
    //note: "what this auth is for",
    //note_url: "http://reddit.com",
    //headers: {
    //    "X-GitHub-OTP": "two-factor-code"
    //}
    //}, function(err, res) {
    //  if (res.token) {
    //      //save and use res.token as in the Oauth process above from now on
    //    }
    //});  
//res.send('Post received - Username: ' + username + ' Password: ' + password + ' Hashed Password: ' + Buffer(hashedPassword, 'binary').toString('hex'));
	}else{
		res.send("Password Incorrect!");
	}
    }
    else{
	res.send("User Not Found");
	}
});
	
});

app.get('/register', function(req, res) {
    res.sendfile(path.join(publicDir, '/register.html'));
});

app.post('/register', function(req, res) {


  var email = req.body.email,
      password = req.body.password,
      hashedPassword = crypto.pbkdf2Sync(password,"DevelopersGuildTheSalt",999,16)

  var user = new models.Users({
    email: email,
    password: hashedPassword
  });

  user.save(function (err, user) {
    if (err){
	res.send(err.message);
	 return console.error(err);
	}
    else{
        res.send('Post received - Email: ' + email + ' Password: ' + password + ' Hashed Password: ' + hashedPassword);
    }
    console.dir(user)
  });

});

var server = app.listen(app.get('port'), function() {
    console.log("\nNode.js server listening on port " + (app.get('port')))

})
