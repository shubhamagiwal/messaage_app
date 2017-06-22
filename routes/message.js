var express = require('express');
var router = express.Router();
var Message = require('../models/message');
router
router.post('/message',function(req,res,next){
	var message = new Message({
        message:req.body.message
	});
	message.save(function(err,result){
		if(err){
			return res.status(500).json({
				title:'error',
				error:err
			});
		}
		res.status(200).json({
			message:"saved message",
			obj:result
		});
	});
});

router.get('/message',function(req,res,next){
	Message.find().exec(function(err,res){
		if(err){
			return res.status(500).json({
				title:'error',
				error:err
			});
			res.status(200).json({
				message:"saved message",
				obj:res
			});
		}
	});
});

module.exports = router;