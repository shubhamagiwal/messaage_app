'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var messageSchema=new Schema({
	message:{
		type:String,
		required:true
		},
	User:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
module.exports = mongoose.model('Message', messageSchema);
