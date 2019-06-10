const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const port = 3000;
var session = require('express-session');
var passport = require('passport');
var  LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb').MongoClient;
//var client = require('socket.io').listen(4000).sockets;
var mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
//const userModel = require('../models/userModel');
usernames = [];


var db = mongoose.connection;
//DB Conf
var db = require('./config/keys').MongoURI;
//passport req

require('./config/passport')(passport);
//db Con

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connection reussie'))
    .catch(err => console.log('rbi r7em'))
//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//to get data with body.req
app.use(express.urlencoded({ extended: true }));

//session express
app.use(
    session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
  );


//flash connect
app.use(flash());



//midllware d passport
app.use(passport.initialize());
app.use(passport.session());


server.listen(port, ()=>{
    console.log('sami3o l3alim f port 3000');
}); 

//var globales

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    
    next();


});
io.sockets.on('connection', function(socket){
	console.log('Utilisateur connecte');

	socket.on('new user', function(data, callback){
		if(usernames.indexOf(data) != -1){
			callback(false);
		} else {
			callback(true);
			socket.username = data;
			usernames.push(socket.username);
			updateUsernames();
		}
	});

	// modification des utilisateurs
	function updateUsernames(){
		io.sockets.emit('usernames', usernames);
	}

	// Envoi des messages
	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data, user:socket.username});
	});

	// Disconnect
	socket.on('disconnect', function(data){
		if(!socket.username){
			return;
		}

		usernames.splice(usernames.indexOf(socket.username), 1);
		updateUsernames();
	});
});

//routes
app.use('/',require('./routes/index.js'));
app.use('/users',require('./routes/users.js'));
app.use('/rooms',require('./routes/rooms.js'));
