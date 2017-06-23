'use Strict'
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports=function(passport){
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy(function(username,password,done)
	{
    	user.findOne({user:username},function(err,user)
    	{
      	  if(err)
          {
             return done(err);
          }
          if(!user)
          {
             return done(null,false,{message:'Incorrect username'});
          }
          var check=user.validatePassword(password);
          if(check===true)
          {
            return done(user);
          }
          else
          {
            return done(null,false,{message:'Incorrect Password'});
          }
        });
    }));
}