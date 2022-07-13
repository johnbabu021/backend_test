const jwt=require('jsonwebtoken')
const { findUserById } = require('../helpers/usersCollection')

const authMiddleware=async(req,res,next)=>{
    // console.log(req.body.caption,'asdf')
    console.log(req.body,"BODY")
    // console.log(req.body,"body")
    console.log(req.headers.authorization,"auth")
    // console.log(req.findUserById)
    // console.log(req.body.caption,"caption")
    const auth=req.headers.authorization
if(auth){
 if(auth.startsWith('Bearer'))
{

const token=auth.substring(auth.indexOf(' ')+1)
const decoded=jwt.verify(token,'shhh')
console.log(decoded)
req.user=await  findUserById(decoded)
console.log(req.user)
if(req.user.role==='admin'){
    req.isAdmin=true
}
console.log(req.isAdmin)
if(req.user.role==='manager'){
    req.isManager=true
}
new Promise((resolve,reject)=>{
    if(decoded){
        resolve(true)
    }
    else{
        console.log('reje')
        reject('Error in signature')
    }
})
.then(()=>{
    res.status(200)
    next()
})
.catch((err)=>{
    res.status(400)
try{
    throw new Error("token verification missing")
}
catch(err){
    next(err)
}
})
}
else{
    res.status(400)
    try{
        throw new Error('Bearer token not found')

    }
    catch(err){
        next(err)
    }
}
}
else{
    res.status(400)
    try{
        throw new Error('Missing authentication')
    }
    catch(err){
        next(err)
    }
}
}


// const determineRole=(req,res,next)=>{

// if(req.body.role){
//     req.user.role
// }

// }
module.exports={
    authMiddleware

}