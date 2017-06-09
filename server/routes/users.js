const express = require('express');
const router = express.Router();
var User = require('../controllers/user_controller');
var helperJwt = require('../helper/jwt_validasi')

router.post('/signup', User.signup)
router.post('/signin', User.signin)
router.post('/', User.insertUser)
router.get('/', helperJwt.verifyLogin, User.findAllUsers);
router.get('/:id', helperJwt.verifyLogin, User.findOneUser);
router.put('/:id', helperJwt.verifyLogin, User.updateUser);
router.delete('/:id', helperJwt.verifyLogin, User.deleteUser);

router.post('/twitter', helperJwt.verifyLogin, User.updateStatusTwitter);




module.exports = router;
