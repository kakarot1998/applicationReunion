const express = require('express');
const app = require('express')();
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const passport = require('passport');
const userModel = require('../models/userModel');
const server = require('http').Server(app);

const io = require('socket.io').listen(server);


router.get('/roomList', (req, res) => res.render('salons'));


router.post('/roomList', (req, res, next) => {
    res.render('salons',{
    failureRedirect: '/',
    failureFlash: true

})(req, res, next);

});

module.exports = router;    