var Blog = require('../models/blog_models');

var insertBlog = (req,res,next)=>{
     var insert = new Blog ({
          title : req.body.title ,
          description : req.body.description,
          image: req.body.image,
          userId : req.body.userId,
          createdAt : new Date() ,
          postdate : new Date(),
          updateAt : new Date()
     })
     insert.save((err, docs) =>{
          if (err) {
               res.send(err.message)
          } else {
               res.send(docs)
          }
     })
 }

var findAllBlog = (req,res,next)=>{
     Blog.find({})
     .populate('User')
     .exec((err, docs)=>{
          if(err) {
               res.send(err.message)
          } else {
               res.send(docs)
          }
     })
}

var deleteBlog = (req,res,next) =>{
     Blog.remove({_id:req.params.id}, (err,docs)=>{
          if (err) {
               console.log(err.message);
          } else {
               res.send(docs)
          }
     })
}

var updateBlog = (req, res,next)=>{
  Blog.findById(req.params.id, (err, docs) => {
   if (err) res.send(err)
   Blog.updateOne({
      _id: docs._id
   }, {
      $set: {
           title : req.body.title || docs.title,
           description : req.body.description || docs.description,
           image: req.body.image || docs.image,
           userId : req.body.userId || docs.userId,
           createdAt : new Date()  ,
           postdate : new Date(),
           updateAt : new Date()
      }
   }, (err, result) => {
      if (err) res.send(err)
      res.send(result)
   })
  })
}



module.exports = {
     insertBlog,
     findAllBlog,
     deleteBlog,
     updateBlog
}
