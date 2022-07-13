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
        console.log('hello')
        const {name,description,price,count}=req.body
    //    if(name&&description&&price&&count)
    //    { 
        const productCreated= await   productCollection.insertOne({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            count:req.body.count
        })
        res.status(201).json(productCreated)
    // }
    // else{
        // res.status(400)
        // next({message:'all fields are required'})
    // }
    
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
    _id:new ObjectId(req.params.product_id)
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
    }).then(async()=>{
   const products=     await productCollection.find({}).toArray()
        res.status(200).json(products)
    }).catch(err=>{
        res.status(400)
        next({message:err})
    })
    }
module.exports={
    createProduct,
    updateProduct,
    getAllProducts

}