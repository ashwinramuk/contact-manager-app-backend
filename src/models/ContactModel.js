const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ContactSchema = new Schema({
    name: String, 
    designation: String, 
    company: String, 
    industry: String,
    email: {type : String, unique:true, require: true},
    phoneNumber: Number,
    country: String,
    user:{type: ObjectId, ref: "users"}     // NOT COMPLETED 
  })

const ContactModel = mongoose.model('contacts', ContactSchema );  // NOT COMPLETED 
module.exports = ContactModel ;
