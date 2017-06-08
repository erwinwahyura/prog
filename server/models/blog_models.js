var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect = ('mongodb://localhost/blog-tdd')

var artikelSchema = new Schema({
  title:  String,
  description: String,
  image : String,
  userId : String,
  createdAt:   Date,
  postdate: Date,
  updateAt: Date
});

var Artikel = mongoose.model('Artikel', artikelSchema);

module.exports = Artikel
