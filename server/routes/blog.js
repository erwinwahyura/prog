var express = require('express')
var router = express.Router();
var ProdBlog = require('../controllers/blog_controller')
const helpersJwt = require('../helpers/jwtVerify')

router.post('/', helpersJwt.tokenVerify, ProdBlog.insertBlog)
router.get('/',  helpersJwt.tokenVerify, ProdBlog.findAllBlog);
router.delete('/:id', ProdBlog.deleteBlog);
router.put('/:id',  ProdBlog.updateBlog);


module.exports = router
