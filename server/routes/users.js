const express = require('express');
const router = express.Router();
var User = require('../controllers/user_controller');

router.post('/signup', User.signup)
router.post('/signin', User.signin)
router.get('/validate', User.validate)


router.post('/', User.insertUser)
router.get('/', User.findAllUsers);
router.get('/:id', User.findOneUser);
router.put('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);


// router.post('/', (req,res,next)=>{
//      res.send('TESSS')
// })

module.exports = router;
