const express = require('express');
const router = express.Router();
var User = require('../controllers/user_controller');

router.post('/', User.signup)
router.post('/', User.signin)
router.post('/', User.insertUser)
router.get('/:id', User.findAllUsers);
router.put('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);


router.post('/', (req,res,next)=>{
     res.send('TESSS')
})

module.exports = router;
