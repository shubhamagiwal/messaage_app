var mongoose = require("mongoose");
var Message = require('./message');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	email:{
		type:String,
		required:true},
	first:{
		type:String,
		required:true},
	last:{
		type:String,
		required:true},
	password:{
		type:String,
		required:true},
	messages:[{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});
module.exports = mongoose.model('User', UserSchema);
