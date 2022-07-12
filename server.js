const express=require('express')
const { connect } = require('./db/db')
const cors=require('cors')
const RegisterRouter = require('./routes/registerRoute')
const { errHandler, notFound } = require('./middleware/erroHandler')
const app=express()
app.use(express.json())
connect()
app.use(cors())


app.use('/api',RegisterRouter)
app.use(errHandler)
app.use(notFound)


app.listen(process.env.PORT||3000,()=>{
    console.log('app listening to port 3000')
})