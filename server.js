'use strict';

const express = require('express')
const app = express()
const path = require('path')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')

const route=require('./server/route')
const braceletModel=require('./server/models/bracelets');

app.use(bodyParser.urlencoded({
     extended:true
}));

app.use(express.static(path.join(__dirname,'./dist')));

app.use(bodyParser.json());

 app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Controll-Allow-Methods','GET,POST,PUT,DELETE,UPDATE,PATCH');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    next();
});

const mongodb='mongodb://localhost:27017/ecommerce';

mongoose.connect(mongodb,(err)=>{
    if(err)
        return console.log('error');
    app.listen(3000,(err)=>{
        if(err)
            console.log(err)
        console.log('server is up at port 3000')
    });
},{ useNewUrlParser:true });

app.use("/api",route);

app.get('*',function(req,res){
    res.sendFile(path.resolve(__dirname,'dist','index.html'));  
}); 
