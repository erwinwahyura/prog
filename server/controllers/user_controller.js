var User = require('../models/user_models');
var bcrypt =  require ('bcrypt')

var signup = (req,res,next) =>{
     User.findOne({email : req.body.email})
     .then ((docs)=>{
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
     User.find(function(err, result){
          if(result) {
               res.send(result)
          } else {
               res.send(err.message)
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
          fullname : req.body.fullname,
          username : req.body.username,
          email : req.body.email,
          password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
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
     User.remove({_id:req.params.id}, (err,docs)=>{
          if (err) {
               console.log(err.message);
          } else {
               res.send(docs)
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
           password : req.body.password || docs.password,
      }
   }, (err, result) => {
      if (err) res.send(err)
      res.send(result)
   })
  })
}


module.exports = {
     signup,
     signin,
     findAllUsers,
     insertUser,
     updateUser,
     deleteUser
}
