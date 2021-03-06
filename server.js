/* --------------------
// NODE PACKAGES
-----------------------*/
var express = require('express')
  , http = require('http')
  , path = require('path')
  , util = require('util')
  , fs = require('fs')
  , nodeStatic = require('node-static')
  , file = new nodeStatic.Server('./public')
  , mongodb = require('mongodb')
  , mongoose = require('mongoose')

/* --------------------
// APPLICATION SETUP
-----------------------*/
var config = require('./app/config')
  , model = require('./app/models/model')
  , controller = require('./app/controllers/controller')
  , view = require('./app/views/view')

    process.env.NODE_ENV = "development";

    var config = {
        fs : {
            publicDir: "./public"
        }
    }


var app = express(),
    publicDir = path.join(__dirname, config.fs.publicDir)

// app.configure("production", function() {
    app.set('port', 22223);


    // app.use(express.logger('dev'));


    // app.use(express.bodyParser()); //parses json, multi-part (file), url-encoded
    // app.use(app.router); //need to be explicit, (automatically adds it if you forget)
    // app.use(express.static(clientDir)); //should cache static assets
// });


app.get('*', function(req, res) {

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

var server = app.listen(app.get('port'), function() {
    console.log("\nNode.js server listening on port " + (app.get('port')))
})
