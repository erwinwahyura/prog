var User = require('../models/user_models');
var bcrypt =  require ('bcrypt');
var express = require('express');
 var OAuth = require('oauth');
 require('dotenv').config()
 var jwt = require('jsonwebtoken')


var signup = (req,res,next) =>{
     console.log('Masuk pertama');
     User.findOne({email : req.body.email})
     .then ((docs)=>{
          console.log('masuk then', docs);
          if(docs) {
               res.send('User name already exists')
          } else {
               User.findOne({email : req.body.email})
               .then((result)=>{
                    console.log(result);
                    if(result) {
                         res.send('This email already exists')
                    } else {
                         var insertUser = new User ({
                              name : req.body.name,
                              email : req.body.email,
                              password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                              phone : req.body.phone
                         })
                         insertUser.save((err, response)=>{
                              if(err) {
                                   res.send(err.message)
                              } else {
                                   res.send(response);
                              }
                         })
                    }
               })
               .catch((err) => {
                    res.send(err.message)
               })
          }
     })
     .catch((err) => {
          res.send(err.message);
     })
}


var signin =  (req,res,next)=> {
User.findOne({email : req.body.email})
    .then((result)=>{
       if(bcrypt.compare(req.body.password, result.password)){
        let token = jwt.sign({
             email:result.email,
             password : result.password
        }, 'secret')
        res.send(token)
       }
       else{
        res.send('password tidak cocok')
       }
    })
    .catch(err=>{
          console.log(err);
    })
}


var findAllUsers = (req,res,next)=>{
     console.log(req.body);
     User.find(function(err, result){
          if(result) {
               res.send(result)
          } else {
               res.send(err)
          }
     })
}

var findOneUser = (req,res,next)=>{
     User.findOne({ _id: req.params.id}, function(err, result) {
          if (err) {
               res.send(err.message)
          } else {
               res.send(result)
          }
     })
}

var insertUser = (req,res,next)=>{
     var insert = new User ({
          name : req.body.name,
          phone : req.body.phone,
          password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
          email : req.body.email
     })
     insert.save((err, docs) =>{
          if (err) {
               res.send(err.message)
          } else {
               res.send(docs)
          }
     })
}

var deleteUser = (req,res,next) =>{
     User.remove({_id:req.params.id}, (err,result)=>{
          if (err) {
               console.log(err.message);
          } else {
               res.send({
                    msg : "Delete Data",
                    result : result
               })
          }
     })
}

var updateUser = (req, res,next)=>{
  User.findById(req.params.id, (err, docs) => {
   if (err) res.send(err)
   User.updateOne({
      _id: docs._id
   }, {
      $set: {
           fullname : req.body.fullname || docs.fullname,
           username : req.body.username || docs.username,
           email : req.body.email || docs.email,
           password : req.body.password || docs.password
      }
   }, (err, result) => {
      if (err) res.send(err)
      res.send(result)
   })
  })
}

var updateStatusTwitter = function(req,res){
  console.log('masuk ',req.body);
      var oauth = new OAuth.OAuth(
           'https://api.twitter.com/oauth/request_token',
           'https://api.twitter.com/oauth/access_token',
           process.env.API_KEY, //Consumer Key (API Key)
           process.env.API_SECRET, //Consumer Secret (API Secret)
           '1.0A',
           null,
           'HMAC-SHA1'
         );
         oauth.post(
         'https://api.twitter.com/1.1/statuses/update.json?status=' + req.body.text,
         process.env.USER_ACCEES_TOKEN, //test user token //Access Token
         process.env.USER_SECRET_TOKEN, //test user secret //Access Token Secret
         req.body.text,
         "text",
         function (err, data){
            // console.log('halooo ==>',words);
           if (err) console.error(err);
           let idtweet = JSON.parse(data)
           res.send(idtweet);
         });
}


// Tessss


module.exports = {
     signup,
     signin,
     findAllUsers,
     findOneUser,
     insertUser,
     updateUser,
     deleteUser,
     updateStatusTwitter
}
