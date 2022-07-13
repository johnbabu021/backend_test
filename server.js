const express=require('express')
const { connect } = require('./db/db')
const cors=require('cors')
const RegisterRouter = require('./routes/registerRoute')
const { errHandler, notFound } = require('./middleware/erroHandler')
const { productRoutes } = require('./routes/productRoutes')
const app=express()
app.use(express.json())
connect()
app.use(cors())


//@route /api/user
//@method post
//@access public
//@authorization `Bearer ${token}`
//@functions register login 
app.use('/api/user',RegisterRouter)

//@route /api/products
//@access private
//@authorization `Bearer ${token}`
//@functions create update read 
app.use('/api/products',productRoutes)
app.use(errHandler)
app.use(notFound)


app.listen(process.env.PORT||3000,()=>{
    console.log('app listening to port 3000')
})