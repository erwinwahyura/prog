var Blog = require('../models/blog_models');

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
              postdate : job.jobdate
         })
         insert.save((err, docs) =>{
              if (err) {
                   res.send(err.message)
                   return done()
              } else {
                   res.send({
                        docs : docs,
                        msg : "data Blog"
                   })
                   return done()
              }
         })
      }
		}, null, true, 'Asia/Jakarta');
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
