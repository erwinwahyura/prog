const jwt = require('jsonwebtoken');
module.exports = {
  tokenVerify : (req, res, next)=>{
    jwt.verify(req.headers.token,'secret', (err, decoded)=>{
        if(err){
          res.send(err)
        }else{
          if(decoded){
            req.decoded = decoded
            next()
          }else{
            res.send({
              msg : 'You can not access this routes'
            })
          }
        }
    })
  }
}
