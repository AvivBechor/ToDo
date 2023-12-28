const express = require('express')
/* const {Router} =  require('express') */
const userControllers = require('./../controllers/userControllers')
const authControllers = require('./../controllers/authControllers')
const router = express.Router()

router.route('/')
.get(userControllers.getUsers)

router.route('/signup')
.post(authControllers.signUp)

router.route('/:id')
.get(authControllers.protect,userControllers.getUser)

router.route('/login')
.post(authControllers.logIn)

module.exports = router
