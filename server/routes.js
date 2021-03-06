let index = require('../controllers/index');
let image = require('../controllers/image');
let login = require('../controllers/login');
let profile = require('../controllers/profile');
let router = require('express').Router();
let passport = require('passport');
let isLogged = require('./isLogged');

module.exports = function(app){
	router.get('/', login.signin);
	router.get('/logged', isLogged, index.home);
	router.get('/image/:image_id', isLogged, image.index);
	router.get('/logout', login.logout);
	router.get('/profile', isLogged, profile.index);
	router.get('/profile/:user_id', profile.retrieve);
	router.get('/chat', isLogged, profile.chatroom);
	router.get('/recover', login.recover);
	router.get('/reset/:email', login.reset);
	router.get('/user_email/:user_email', profile.getEmail);
	router.put('/update/:user_id', profile.update);
	router.post('/upload', image.create);
	router.post('/image/:image_id/like', image.like);
	router.post('/image/:image_id/comment', image.comment);
	router.post('/signup', login.signup);
	router.post('/login', passport.authenticate('local-login', {
		'successRedirect':'/logged',
		'failureRedirect':'/',
		'failureFlash':true
	}));
	router.post('/search', login.search);
	router.post('/reset/:email', login.resetpassword);
	router.delete('/image/:image_id', image.remove);
	router.delete('/accountdelete/:user_email', profile.delete);
	
	app.use(router);
}