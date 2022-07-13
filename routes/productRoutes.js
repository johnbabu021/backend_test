const express=require('express')
const { createProduct, updateProduct } = require('../controllers/productControllers')
const { authMiddleware } = require('../middleware/authMiddleware')



const app=express()

const productRoutes=express.Router()


productRoutes.route('/').post(authMiddleware,createProduct).patch(authMiddleware,updateProduct)

module.exports={
    productRoutes
}