
var jwt = require('jsonwebtoken')
const methods = {}

methods.verifyLogin = function(req,res, next){
  console.log('body token :', req.body, 'headers ', req.headers);
  jwt.verify(req.headers.token, 'secret', function(err, decoded){
    if(!err){
      if(decoded.email){
        console.log('sukses masuk jwt',req.body);
        next()
      }
      else{
        console.log('ga sukses',req.body);
        res.send('Anda Tidak punya Akses')
      }
    }
    else {
      res.send('Anda tidak punya Akses')
    }
  })
}

module.exports = methods
