const express = require('express');
const router = express.Router();

//Bring in Article Model
let Article = require('../models/article');

//add route
router.get('/add', (req,res) => {
	res.render("add_article", {
		title: "Add article",
		pretty : true
	});		
});

//add Submit POST route
router.post('/add', (req,res) => {

	req.checkBody("title", "Title is required").notEmpty();
	req.checkBody("author", "Author name is required").notEmpty();
	req.checkBody("body", "Body is required").notEmpty();

	//catch errors
	let errors = req.validationErrors();
	if(errors){
		res.render('add_article', {
			title: "Add article",
			errors: errors
		});
	} else {
		let article = new Article();
		article.title = req.body.title;	
		article.author = req.body.author;
		article.body = req.body.body;

		article.save(err => {
			if(err){
				console.log(err);
				return;
			} else {
				req.flash('success','Article Added');
				res.redirect('/');
			}
		});
	}
});

//Load edit Form
router.get('/edit/:id', (req,res) => {  //:id is a placeholder
	Article.findById(req.params.id, (err, article) => { //if you have the route /user/:name, then the “name” property is available as req.params.name.
		res.render("edit_article", {
			article: article,
			title: "Edit: ",
			pretty : true		
		});	
	});	
});

//update submit POST route
router.post('/edit/:id', (req,res) => {
	let article = {};
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	let query = {_id:req.params.id};

	//Updates one document in the database without returning it.
	Article.update(query, article, (err) => {
		if(err){
			console.log(err);
			return;
		} else {
			req.flash('success','Article Updated');
			res.redirect('/');
		}
	});
});

//delete Single Article
router.delete('/:id', (req,res) => {  //:id is a placeholder
	let query = {_id:req.params.id};

	Article.remove(query, (err) => { //if you have the route /user/:name, then the “name” property is available as req.params.name.
		if(err){
			console.log(err);
			return;
		} else {
			req.flash('danger','Article Deleted');
			res.send('Success');
		}	
	});	
});

//get Single Article
router.get('/:id', (req,res) => {  //:id is a placeholder
	Article.findById(req.params.id, (err, article) => { //if you have the route /user/:name, then the “name” property is available as req.params.name.
		res.render("article", {
			article: article,
			pretty : true
		});	
	});	
});

module.exports = router;