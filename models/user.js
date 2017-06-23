var mongoose = require("mongoose");
var Message = require('./message');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	email:{
		type:String,
		required:true,
		unique:true
	},
	first:{
		type:String,
		required:true},
	last:{
		type:String,
		required:true},
   	hash:String,
   	salt:String,
	messages:[{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'SHA1').toString('hex');
}

UserSchema.methods.validatePassword = function(password){
    var hash=crypto.pbkdf2Sync(password, this.salt, 1000, 64,'SHA1').toString('hex');
    return this.hash === hash;
};

module.exports = mongoose.model('User', UserSchema);
