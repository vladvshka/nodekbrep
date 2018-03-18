const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); //core module
const pug = require('pug');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb'); //connect to nodekb database 
const session = require('express-session'); //required for conect-flash
const flash = require('connect-flash'); //required for messages
//old version of express-validator
const expressValidator = require("express-validator");

//init app
const port = 3000;
const app = express();

//Bring in Article Model
let Article = require('./models/article');
//Bring in User Model
let User = require('./models/user');

//check connection
const db = mongoose.connection;
db.once('open', ()=>{
	console.log("Connected to MongoDB");
});
//check for db errors
db.on('error', console.error.bind(console, 'connection error:'));

//Set body-parser middleware
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

// Set public folder for statics
app.use(express.static(path.join(__dirname, 'public')));  

//express-session middleware
app.use(session({
	secret: 'keyboard cat',
	resave: true, //Forces the session to be saved back to the session store, even if the session was never modified during the request. 
	saveUninitialized: true,//Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. 
}));

//express-messages middleware
app.use(flash());
app.use((req, res, next) => {
	//setting global var messages
	res.locals.messages = require('express-messages')(req, res);
	next();
});

// Express-validator middleware
app.use(expressValidator({
   errorFormatter: function(param, msg, value) {
       var   namespace = param.split('.'),
             root      = namespace.shift(),
             formParam = root;

     while(namespace.length) {
       formParam += '[' + namespace.shift() + ']';
     }
     return {
       param : formParam,
       msg   : msg,
       value : value
     };
   }
 }));

//load view engine
app.set('views', path.join(__dirname, 'views')); //specify folder for views
app.set('view engine', 'pug');

//home route
app.get('/', (req, res) => {
	Article.find({}, (err, articles)=>{
		if(err) console.log(err);
		else{
			res.render("index", {
				title: "Articles",
				articles: articles,
				pretty : true
			});
		}	
	});
});

//Bring in route file adress
let articles = require('./routes/articles');
//order of use is important!
app.use('/articles', articles);

//Bring in user file adress
let users = require('./routes/users');
app.use('/users', users);

//start server
app.listen(port, () =>{
	console.log(`Server started on port ${port}`);
});

