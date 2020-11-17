const express =require('express');
const config=require('./config')
const routes=require('../routes')

const app=express();

require('../config/mongoose')

app.use(express.json())
app.use(express.urlencoded())

app.use('/',routes)

module.exports=app;
