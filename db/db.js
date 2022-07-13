const { MongoClient } = require('mongodb');
// const { movieSchema } = require('../models/movieschema');
require("dotenv").config();

const url =process.env.MNGD;
const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('testbackend');
const usersCollection=db.collection('test_user')
const productCollection=db.collection('test_prod')
async function connect(){
    try{
      await  client.connect()
        console.log('connected succesfully')
    }
    catch(e){
        console.log(e)
    }
}
module.exports={
    
    connect,
    usersCollection,
    productCollection,
    db
}