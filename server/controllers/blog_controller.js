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

var deleteBlog = function(req,res,next) {
     Blog.remove({_id:req.params.id}, function(err,docs){
          if(!err){
               res.send({
                    msg : "Delete Data",
                    docs : docs
               })
          }else{
               res.send(err)
          }
     })
}

var updateBlog = (req, res)=>{
     Article.findById(req.params.id)
     .then(result=>{
          result.update({
               title : req.body.title || result.title,
               description : req.body.description || result.description,
               image : req.body.image || result.image
          })
          .then(response=>{
               res.send({
                    result : response,
                    msg : "Updated Data"
               })
          })
          .catch(error=>{
               res.send(error)
          })
     })
     .catch(err=>{
          res.send(err)
     })
}



module.exports = {
     insertBlog,
     findAllBlog,
     deleteBlog,
     updateBlog
}
