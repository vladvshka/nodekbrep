//mongoose allows to structure data on application level rather then on data level in SQLDB
const mongoose = require('mongoose');

/*
Everything in Mongoose starts with a Schema. 
Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
*/
//Article Schema
const articleSchema = mongoose.Schema({
	title:{
		type: String,
		required: true   
		/*All SchemaTypes have the built-in required validator. 
		The required validator uses the SchemaType's checkRequired() function 
		to determine if the value satisfies the required validator.*/
	},
	author:{
		type: String,
		required: true
	},
	body:{
		type: String,
		required: true
	}
});

//To use our schema definition, we need to convert articleSchema into a Model we can work with
let Article = module.exports = mongoose.model("Article", articleSchema);