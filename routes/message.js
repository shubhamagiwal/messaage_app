var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

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

function isLoggedIn (req, res, next) {
	jwt.verify(req.query.token,process.env.SECRET,function(err,decoded){
		if(err)
		{
			return res.status(401).json({
				title:'Not Authorized',
				error:err
			})
		}
		next();
	})
}

router.delete('/messageDelete/:id',isLoggedIn,function(req,res,next){
	var decode = jwt.decode(req.query.token,process.env.SECRET);
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
		if(message.user!==decode.user)
		{
			return res.status(401).json({
				title:'Not Authorized',
				error:{message:'Not a valid user'}
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
				res.status(200).json({
						title:'updated message',
						obj:result
				});
		});
	});
});

router.post('/message',isLoggedIn,function(req,res,next){
	var decode = jwt.decode(req.query.token,process.env.SECRET);
	User.findById(decode.user._id,function(err,user){
		if(err)
		{
			return res.status(500).json({
				title:'error',
				error:err
			});
		}
		if(!user)
		{
			return res.status(401).json({
				title:'Not Authorized',
				error:{message:'Not a valid user'}
			});
		}
		var message = new Message({
       		 message:req.body.message,
       		 User:user
		});
		message.save(function(err,result){
			if(err){
				return res.status(500).json({
					title:'error',
					error:err
				});
			}
			user.messages.push(result);
			res.status(200).json({
				message:"saved message",
				obj:result
			});
		});	
	});
});

router.patch('/updateMessage/:id',isLoggedIn,function(req,res,next){
	var decode = jwt.decode(req.query.token,process.env.SECRET);
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
		if(message.user!==decode.user){
			return res.status(401).json({
				title:'Not Authorized',
				error:{message:'Not a valid user'}
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