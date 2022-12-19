const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ContactSchema = new Schema({
    Name: String, 
    Designation: String, 
    Company: String, 
    Industry: String,
    Email: {type : String, unique:true, require: true},
    PhoneNumber: Number,
    Country: String,
    user:{type: ObjectId, ref: "<Name of the mod/collection>"}     // NOT COMPLITED 
  })

const ContactModel = mongoose.model('<name of the collection for contsct >', ContactSchema );  // NOT COMPLITED 
module.exports = ContactModel ;