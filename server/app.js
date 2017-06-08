const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



var db_config = {
     development : 'mongodb://localhost/prodblog',
     test : 'mongodb://localhost/prodblog-tdd-tes'
}

var app_env = app.settings.env

mongoose.connect(db_config[app_env], function(){
     console.log('connect to db blog-tdd' +db_config[app_env]);
});


var blog = require('./routes/blog');
var users = require('./routes/users');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/api/blog', artikel)
app.use('/api/users', users)



app.listen(3000, ()=>{
     console.log('connect server');
})


module.exports = app;
