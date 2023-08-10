const express = require('express')
const router = express.Router();
const {registerUser, LoginUser, getMe} = require('../controlers/userController')
const {Protect}  = require('../middleware/authMiddleware');

router.post('/',registerUser)
router.post('/login',LoginUser)
router.get('/me', Protect, getMe)

module.exports = router