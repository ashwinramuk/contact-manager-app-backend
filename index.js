const express = require('express')
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const app = express()
require('dotenv/config');

//import models
const UserModel = require('./src/models/UserModel');
const ContactModel = require('./src/models/ContactModel');
//import Routes
const UserRoute = require('./src/routes/UserRoute');
const ContactRoute = require('./src/routes/ContactRoute')

//connection to database 
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('database Connected!'))
    .catch((e) => console.log('Error!!! to connect the database'+e.message))
// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded())
const tokenVerification = (req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization;
        if(token){
          jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
              return res.status(403).json({
                status:"Failed",
                Error:err.name,
                message:err.message
              })
            }
            req.userID = decoded.data;
            next();
          })
        }else{
          return res.status(403).json({
            status:"Failed",
            message:"Token is missing"
          })
        }
    }else{
      return res.status(403).json({
        status:"Failed",
        message:"Authorization key and token value in header is missing"
      })
    }
}

//define route path
app.use('/api/users',UserRoute)
app.use('/api/contacts',tokenVerification,ContactRoute)

//BAD REQUEST
app.use('*',(req, res)=>{
  res.status(404).json({
    status: 'Failed',
    message: '404! not found'
  })
})

app.listen(4000, () => console.log('server start at port 4000....'))
