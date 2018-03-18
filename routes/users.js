const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

//Bring in Article Model
let User = require('../models/user');

//Register Form
router.get('/register', (req,res) => {
	res.render('register');
});

//Register Form POST
router.post('/register', (req,res) => {
	const name = req.body.name;
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords dont match').equals(req.body.password);

	let errors = req.validationErrors();
	if (errors) {
		res.render('register', {
			errors: errors
		});
	} else {
		let newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});
		//generate the salt portion from a hash. Does not validate the hash.
		bcryptjs.genSalt(10, (err, salt) => {
			//Asynchronously generates a hash for the given string.
			bcryptjs.hash(newUser.password, salt, (err, hash) => {
				if(err){
					console.log(err);
				}
				//set hashed password
				newUser.password = hash;
				newUser.save(err => {
					if (err) {
						console.log(err);
						return
					} else {
						req.flash('success', 'You are successfully registered!');
						res.redirect('/users/login');
					}
				});
			});
		});
	}
});

router.get('/login', (req, res) => {
	res.render('login');
});


module.exports = router;