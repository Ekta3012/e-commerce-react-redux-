const express = require('express');
const router = express.Router();

const braceletModel=require('./models/bracelets');

const perPageData=20;

router.get('/getbracelets', (req, res) => {
    const pageNumber=parseInt(req.query.pageNumber) || 1;

    braceletModel.find({},(err,response)=>{
        if(err)
            return res.status(400).send(err);
        return res.status(200).json(response);
    }).skip(perPageData*(pageNumber-1)).limit(perPageData);
})

router.get('/priceFilterBracelets',(req,res)=>{
    const min=req.query.minimum;
    const max=req.query.maximum;
    
    braceletModel.find({Price:{$gt:min,$lt:max}},(err,response)=>{
        if(err)
            return res.status(400).send(err);
        return res.status(200).json(response);
    })
})

router.get('/categoryFilterBracelets',(req,res)=>{
    const category=req.query.category.toString();

    braceletModel.find({Category:category},(err,response)=>{
        if(err)
            return res.status(400).send(err);
        return res.status(200).json(response);
    })
})

module.exports=router;
