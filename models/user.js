const mongoose = require('mongoose');

//User Schema
const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true   
		/*All SchemaTypes have the built-in required validator. 
		The required validator uses the SchemaType's checkRequired() function 
		to determine if the value satisfies the required validator.*/
	},
	email:{
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model("User", userSchema);