var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.delete('/messageDelete/:id',function(req,res,next){
	console.log("*");
	Message.findById(req.params.id,function(err,message){
		if(err)
		{
			return res.status(500).json({
				title:'error',
				error:err
			});
		}
		if(!message){
			return res.status(500).json({
				title:'no message found',
				error:{message:'No message found'}
			});
		}
		message.remove(function(err,result){
				if(err)
				{
					return res.status(500).json({
					title:'error',
					error:err
					});
				}
				console.log("hello");
				res.status(200).json({
						title:'updated message',
						obj:result
				});
		});
	});
});

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
	Message.find().exec(function(err,result){
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

router.patch('/updateMessage/:id',function(req,res,next){
	Message.findById(req.params.id,function(err,message){
		if(err)
		{
			return res.status(500).json({
				title:'error',
				error:err
			});
		}
		if(!message){
			return res.status(500).json({
				title:'no message found',
				error:{message:'No message found'}
			});
		}
		message.message=req.body.message;
		message.save(function(err,result){
				if(err)
				{
					return res.status(500).json({
					title:'error',
					error:err
				});
				}
					res.status(200).json({
						title:'updated message',
						obj:result
				});
			})
		});
});

module.exports = router;