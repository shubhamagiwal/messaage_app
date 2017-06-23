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

messageSchema.post('remove',function(message){
	User.findById(message.User,function(err,user){
		user.messages.pull(message);
		user.save();
	});
})
module.exports = mongoose.model('Message', messageSchema);
