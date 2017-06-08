var express = require('express')
var router = express.Router();
var ProdBlog = require('../controllers/blog_controller')

router.post('/', ProdBlog.insertBlog)
router.get('/',  ProdBlog.findAllBlog);
router.delete('/:id', ProdBlog.deleteBlog);
router.put('/:id',  ProdBlog.updateBlog);


module.exports = router
