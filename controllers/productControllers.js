const { ObjectId } = require("mongodb")
const { productCollection } = require("../db/db")

const createProduct=(req,res,next)=>{

new Promise((resolve,reject)=>{
    if(req.isAdmin&&req.body){
        resolve(true)
    }
    else{
        reject('you don\'t have access to the create product')
    }
}).then(async()=>{
const productCreated= await   productCollection.insertOne(req.body)
res.status(201).json(productCreated)



}).catch(err=>
    {
        res.status(500)
        next({message:err})
    })


}



const updateProduct=(req,res)=>{
    new Promise((resolve,reject)=>{
        if(req.isAdmin||req.isManager&&req.body){
            resolve(true)
        }
        else{
            reject('you don\'t have access to update the product')
        }
    }).then(async()=>{
await productCollection.updateOne({
    _id:new ObjectId(req.body.product_id)
},{
    $set:{
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        count:req.body.count
    }
}).then((data)=>{
    res.status(200).json('data updated succesfully')
}).catch((err)=>{
    res.status(400)
    next({message:err})
})

    })

}


const getAllProducts=async(req,res)=>{
    new Promise((resolve,reject)=>{
        if(req.isAdmin||req.isManager){
            resolve(true)
        }
        else{
            reject('you don\'t have access to this route')
        }
    })
    await productCollection.find().toArray()
    }
module.exports={
    createProduct,
    updateProduct

}