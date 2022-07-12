const express=require('express')
const { loginController } = require('../controllers/loginController')
const { registerController } = require('../controllers/registerController')


const RegisterRouter=express.Router()


RegisterRouter.route('/register').post(registerController)
RegisterRouter.route('/login').post(loginController)
module.exports=RegisterRouter