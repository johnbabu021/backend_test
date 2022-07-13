const express=require('express')
const { loginController } = require('../controllers/loginController')
const { registerController } = require('../controllers/registerController')


const RegisterRouter=express.Router()


RegisterRouter.route('/register')

//@route /api/products
//@access public
//@functions register new user
.post(registerController)
RegisterRouter.route('/login')

//@route /api/products
//@access public
//@functions login new user
.post(loginController)
module.exports=RegisterRouter