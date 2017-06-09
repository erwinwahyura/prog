var Blog = require('../models/blog_models');
var firebase = require('firebase')
var config = {
apiKey: "AIzaSyBFeB00_BJThgniQHFGWEDb7iD8F0bhoK8",
authDomain: "kanban-project.firebaseapp.com",
databaseURL: "https://kanban-project.firebaseio.com/",
storageBucket: "gs://kanban-project.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();
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

            function writeUserData(id,title, description, image, userId, createdAt, postdate, updateAt) {
            firebase.database().ref('product/'+ id).set({

            // id: id,
              title: docs.title,
              description: docs.description,
              image: docs.image,
              // userId: docs.userId,
              createdAt: docs.createdAt,
              postdate: docs.postdate,
              updateAt: docs.updateAt

            });
            console.log('write data sukses');
            }
              // var data = docs._id
              let str = '0123456789';
              let length = 3;
              let result = '';
              for (let i = length; i > 0; i--) {
                result += str[Math.floor(Math.random() * str.length)];
              }
              console.log('-------------1',result);
              writeUserData(result, docs)
              res.send(result,docs)

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
