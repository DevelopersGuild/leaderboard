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

var Grid = require('gridfs-stream');




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

  var models = require('./app/models/user')(mongoose);
  var achievements = require('./app/models/achievement')(mongoose);
  var imgPath = './public/img/avatar1.png';
  var gfs = Grid(db, mongoose);

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

app.get('/achievement', function(req,res){
    res.sendfile(path.join(publicDir, '/achievement.html'));
});

app.post('/achievement', function(req,res){
	var name = req.body.name;
	var achieve = new achievements.Achievements({name: name});
	var imgName = "avatar1.png";
	fs.createReadStream(imgPath);
//        gfs.createWriteStream({filename: imgName, mode:"w+"});
    	achieve.img.name = imgName;
        achieve.img.contentType = 'image/png';
	
        achieve.save(function (err, achieve) {
    	if (err){
		res.send(err.message);
	 	return console.error(err);
		}
	});
        var user = models.Users.findOne({email: "achive@test.cc"}, function(err, user){ 
	//var user = new models.Users({email: "achive@test.cc", password: "123455" });
 	console.log(user.id);
	var userAchieve = models.UserAchievements.findOne({user: user._id}, function(err, userAchieve){
//user.save();
	userAchieve.achievements.push(achieve);
	userAchieve.save(function (err, userAchieve) {
    	if (err){
		res.send(err.message);
	 	return console.error(err);
		}
	});
 
});
});
res.send('');
//res.contentType(achieve.img.contentType);
//res.send(achieve.img.data);
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
