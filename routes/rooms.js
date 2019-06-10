const express = require('express');
const app = require('express')();
const router = express.Router();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { ensureAuthenticated } = require('../config/auth');
const passport = require('passport');
const userModel = require('../models/userModel');
const server = require('http').Server(app);



router.get('/roomList', (req, res) => res.render('salons'));
router.get('/room1', ensureAuthenticated , (req, res) => 


res.render('rooms/room1',{
    name : req.user.name


}));
router.get('/room2', ensureAuthenticated , (req, res) => 


res.render('rooms/room2',{
    name : req.user.name


}));
router.get('/room3', ensureAuthenticated , (req, res) => 


res.render('rooms/room3',{
    name : req.user.name


}));
router.get('/room4', ensureAuthenticated , (req, res) => 


res.render('rooms/room4',{
    name : req.user.name


}));



router.post('/roomList', (req, res, next) => {
    res.render('salons',{
    failureRedirect: '/',
    failureFlash: true

})(req, res, next);

});
router.post('/room1', (req, res, next) => {
    res.render('rooms/room1',{
    failureRedirect: '/',
    failureFlash: true

})(req, res, next);

});
router.post('/room2', (req, res, next) => {
    res.render('rooms/room2',{
    failureRedirect: '/',
    failureFlash: true

})(req, res, next);

});router.post('/room3', (req, res, next) => {
    res.render('rooms/room3',{
    failureRedirect: '/',
    failureFlash: true

})(req, res, next);

});router.post('/room4', (req, res, next) => {
    res.render('rooms/room4',{
    failureRedirect: '/',
    failureFlash: true

})(req, res, next);

});
io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = user.name;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});


module.exports = router;    