var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { usersCollection } = require('../db/db');
const { generateToken } = require('../utils/generateToken');

const registerController=async(req,res,next)=>{
    const {username,phone,email,password,role}=req.body
    const user = await usersCollection.findOne({ email })
    new Promise((resolve,reject)=>{
        if(user){
            reject('user exists')
        }
        else{
            resolve()
        }
    }).then(async()=>{
        if(username&&phone&&email&&password&&role)
        {
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
           })
           console.log(createdUser)
           const userExists = await usersCollection.findOne({ email })

           if(createdUser)

        var token = await generateToken(createdUser.insertedId)
        res.json({
            _id:userExists._id,
            username: userExists.username,
            email: userExists.email,
            token: await generateToken(userExists._id)
        })
        }
        else{
            throw new Error('please fill out all the fields')
        }
    }).catch(err=>{
        next({message:err})

    })
  
}



module.exports={
    registerController
}