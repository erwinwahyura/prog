var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect = ('mongodb://localhost/prodblog')

var artikelSchema = new Schema({
  title:  String,
  description: String,
  image : String,
  userId :  {
       type : Schema.Types.ObjectId,
       ref : 'User'
  },
  postdate: String
}, {timestamps:true});

var Blog = mongoose.model('Blog', artikelSchema);

module.exports = Blog
