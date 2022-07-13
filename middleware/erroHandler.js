const express=require('express')
const errHandler=(err,req,res,next)=>{
    if(err){
        res.status(res.statusCode||500).json({err:err.message    })
// res.render('error',{err:err.message})
        

    }
}

const notFound=(req, res) => {
    console.log(req.protocol+req.get('host'))
      res.status(404).json(`The Requested page ${req.protocol}//:${req.get('host')}${req.url} does not exist`)
    }

module.exports={
    errHandler,
    notFound
}