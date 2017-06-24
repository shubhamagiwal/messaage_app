var express = require('express');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').load();


router.post('/signup',function(req,res,next)
{
	var user = new User();
	user.first=req.body.first;
	user.last=req.body.last;
	user.email=req.body.email;
	user.setPassword(req.body.password,function(err,result){
		if(err)
		{
			return res.status(500).json({
				title:'error',
				error:err
			});
		}
	});
	user.save(function(err,result){
		if(err)
		{
			return res.status(500).json({
				title:'error',
				error:err
			});
		}
		res.status(200).json({
			title:'Password saved',
			obj:result
		})
	});
});

router.post('/login',function(req,res,next){
	User.findOne({email:req.body.email},function(err,user){
			if(err)
			{
				return res.status(500).json({
					title:'error',
					error:err
				});
			}
			if(!user)
			{
				return res.status(500).json({
					title:'error',
					error:{
						message:'Invalid Credential'
					}
				});
			}
			var check=user.validatePassword(req.body.password,function(err){
				if(err)
				{
					return res.status(500).json(
					{title:'error',
					error:{
						message:'Wrong Password'
					}});
				}
			});
			if(!check)
			{
				return res.status(500).json({
					title:'error',
					error:{message:'Wrong Password'}
				});
			}
			var token= jwt.sign({user:user},process.env.SECRET,{expiresIn:7200});
			res.status(200).json({
				message:'successfully signed in',
				token:token,
				userId:user._id,
				first:user.first
			});
	})
});
module.exports=router;