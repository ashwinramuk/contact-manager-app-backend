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
// MIDLEWRE


//define route path
app.use('/api/users',UserRoute)
app.use('/<path>',ContactRoute)

//BAD REQUEST
app.use('*',(req, res)=>{
  res.status(404).json({
    status: 'Failed',
    message: '404! not found'
  })
})

app.listen(4000, () => console.log('server start at port 4000....'))
