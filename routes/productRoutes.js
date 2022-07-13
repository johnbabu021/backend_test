const express=require('express')
const { createProduct, updateProduct, getAllProducts } = require('../controllers/productControllers')
const { authMiddleware } = require('../middleware/authMiddleware')



const app=express()

const productRoutes=express.Router()


productRoutes.route('/')

//@route /api/products
//@METHOD get
//@access private
//@authorization `Bearer ${token}` 
.get(authMiddleware,getAllProducts)
//@route /api/products
//@METHOD POST
//@access private
//@authorization `Bearer ${token}` 
.post(authMiddleware,createProduct)
//@route /api/products
//@METHOD patch
//@access private
//@authorization `Bearer ${token}` 
productRoutes.route('/:product_id').patch(authMiddleware,updateProduct)

module.exports={
    productRoutes
}