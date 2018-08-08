'use strict';

const express = require('express')
const app=express()

app.get('*',function(req,res){
    res.sendFile(path.resolve(__dirname,'','index.html'))
});

app.listen(3000,()=>{
    console.log("express is up and running at port 3000");
})

