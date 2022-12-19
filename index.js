const express = require('express')
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const app = express()

//import models
const UserModel = require('./src/models/UserModel');
const ContactModel = require('./src/models/ContactModel');
//import Routs
const UserRoute = require('./src/routes/UserRoute');
const ContactRoute = require('./src/routes/ContactRoute')

//connection to database 
mongoose.connect('mongodb+srv://10x-project-group-6:10x-project-group-6@contacts-manager.srkvjrw.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('database Connected!'))
    .catch(() => console.log('Error!!! to connect the database'))
// MIDLEWRE


//define route path
app.use('/<path>',UserRoute)
app.use('/<path>',ContactRoute)

//BAD REQUEST
app.use('*',(req, res)=>{
  res.status(404).json({
    status: '404! not found'
  })
})

app.listen(4000, () => console.log('server start at port 4000....'))
