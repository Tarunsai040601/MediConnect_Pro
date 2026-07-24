const express=require("express")
const dotenv=require('dotenv').config({quiet:true})
const { dataBaseconnection }=require('./Configurations/config.js')
const app=express()
const port = process.env.serverPort ||8085
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`)
})
dataBaseconnection()
