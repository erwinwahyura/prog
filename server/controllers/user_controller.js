var User = require('../models/user_models');
var bcrypt =  require ('bcrypt');
var jwt = require('jsonwebtoken')

var signup = (req, res)=>{
  User.findOne({
    email : req.body.email
  })
  .then(response=>{
    if(!response){
      var insertUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        phone: req.body.phone
      })
      insertUser.save((err, result)=>{
        if(!err){
          res.send({
            result : result,
            msg : 'Data User Added, You may now log-in with the email you have chosen'
          })
        }else{
          res.send(err)
        }
      })
    }else{
      res.send({message : 'Email already exists'})
    }
  })
  .catch(error=>{
    res.send(error)
  })
}

var signin = (req, res)=>{
  User.findOne({
    email : req.body.email
  })
  .then(result=>{
    if(!result){
      res.send({
        msg : "Email not Registered"
      })
    }else{
      if(bcrypt.compareSync(req.body.password, result.password)){
        var token = jwt.sign({
          id : result._id,
          name : result.name,
          email : result.email,
          phone: result.phone || null
        }, 'secret')
        res.send({
          token : token
        })
      }else{
        res.send({
          msg : "Password is wrong"
        })
      }
    }
  })
  .catch(err=>{
    res.send(err)
  })
}

var validate = (req, res)=>{
  jwt.verify(req.headers.token, 'secret', (err, decoded)=>{
    if(err){
      res.send(err)
    }else{
      if(decoded){
        res.send(decoded)
      }else{
        res.send({
          msg : 'You can not access this routes'
        })
      }
    }
  })
}

var findAllUsers = (req,res,next)=>{
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


module.exports = {
    validate,
     signup,
     signin,
     findAllUsers,
     findOneUser,
     insertUser,
     updateUser,
     deleteUser
}
