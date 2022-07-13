var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { usersCollection } = require('../db/db');
const { generateToken } = require('../utils/generateToken');

const registerController=async(req,res,next)=>{
    const {username,phone,email,password,role}=req.body
    const user = await usersCollection.findOne({ email })
    new Promise((resolve,reject)=>{
        console.log(user,"user")
        if(user){
            console.log('user exists')
            reject('user exists')
        }
        else{
            resolve()
        }
    }).then(async()=>{
   
            const createdUser=  await bcrypt.hash(password, 10)
            .then(async(data)=>{
    
      const user= await    usersCollection.insertOne({
                username:username,
                email:email,
                password:data,
                role:role,
                phone:phone
            })
            return user
           }).catch(err=>{
            console.log(err,"err")
           })
           console.log(createdUser)
           const userExists = await usersCollection.findOne({ email })
console.log(userExists,"useexits")
           if(createdUser)

        var token = await generateToken(createdUser.insertedId)
        console.log(token)
        res.status(200).json({
            _id:userExists._id,
            username: userExists.username,
            email: userExists.email,
            role:userExists.role,
            token: token
        })
       
    })
  
}



module.exports={
    registerController
}