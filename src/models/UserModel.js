const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({    
    email: {type : String,unique:true, required: true},
    password: {type : String, required: true},

    // NOT COMPLITED 
    userPicURL: String, //static one image	
    name: String, //	demo1	
    AccessDesignation: {type :String }	//normal, Admin, superAdmin, 
  })
  const UserModel = mongoose.model('users', UserSchema ); // NOT COMPLITED 
  module.exports = UserModel;
