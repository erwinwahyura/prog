var CronJob = require('cron').CronJob;
var kue = require('kue');
var queue = kue.createQueue();
var Blog = require('../models/blog_models');

var CronJob = require('cron').CronJob;
var second = 04
var kata = 'satu'
var kata2 = 'dua'


var insertBlog = (req,res)=>{
  console.log('hi');
     var insert = new Blog ({
          kata,
          kata2
     })
     insert.save((err, docs) =>{
          if (err) {
               res.send(err.message)
          } else {
          console.log('sukses============222');
               res.send(docs)
          }
     })
 }

new CronJob(`* * * * * *`, function() {

   var job = queue.create('insertBlog', {
     
   })
     .save((err) => {
       if (!err) {
         console.log('sukses !',job.data);
       }
     });
  queue.process('insertBlog', function(job, done){
    console.log(job.data);
    insertBlog(job.data.to, done);

  });

  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
