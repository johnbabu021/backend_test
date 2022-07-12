const { MongoClient } = require('mongodb');
// const { movieSchema } = require('../models/movieschema');
require("dotenv").config();

const url =process.env.MNGD;
const client = new MongoClient(url);

const db = client.db('testbackend');
const usersCollection=db.collection('test_user')
const postsCollection=db.collection('test_post')
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
    db
    

}