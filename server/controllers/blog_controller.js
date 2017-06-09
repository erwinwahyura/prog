var Blog = require('../models/blog_models');
const CronJob = require('cron').CronJob
const kue = require('kue')
const queue = kue.createQueue()

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
  console.log(req.decoded);
  var time = req.body.postdate;
  var day = time.substring(8, 10);
  var month = time.substring(5, 7)-1;
  var minute = time.substring(14, 16);
  var hour = time.substring(11, 13);
  console.log(day, month, minute, hour);
		new CronJob(`0 ${minute} ${hour} ${day} ${month} *`, function() {
			var job = queue.create('insertData', {
          title : req.body.title ,
          description : req.body.description,
          image: req.body.image,
          userId : req.decoded.id,
          postdate : req.body.postdate
				})
        .removeOnComplete( true )
				.save(function(err){
				   if( !err ) console.log("Cron job sukses", job.id );
				});
			queue.process('insertData', function(job, done){
		  	insert(job.data, done);
			});

			function insert(job, done){
         var insert = new Blog ({
              title : job.title ,
              description : job.description,
              image: job.image,
              userId : job.userId,
              postdate : job.postdate
         })
         insert.save((err, docs) =>{
              if (err) {
                   res.send(err.message)
                   return done()
              } else {
                function writeUserData(id,title, description, image) {
            firebase.database().ref('product/'+ id).set({

            // id: id,
              title: docs.title,
              description: docs.description,
              image: docs.image
              // userId: docs.userId,
              // createdAt: docs.createdAt,
              // postdate: docs.postdate,
              // updatedAt: docs.updatedAt

            });
            console.log('write data sukses');
            }
            let str = '0123456789';
            let length = 3;
            let result = '';
            for (let i = length; i > 0; i--) {
              result += str[Math.floor(Math.random() * str.length)];
            }
            console.log('-------------1',result);
            writeUserData(result, docs)
            res.send(docs)
                   return done()
              }
         })
      }
		}, null, true, 'Asia/Jakarta');
 }

var findAllBlog = (req,res,next)=>{
     Blog.find({})
     .populate('userId')
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
