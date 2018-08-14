const mongoose=require('mongoose');

const braceletSchema=mongoose.Schema({
    id:Number,
    Title:String,
    Description:String,
    Price:Number,
    Category:String,
    url:String
})

const Bracelet=mongoose.model('bracelet',braceletSchema);

module.exports=Bracelet;
