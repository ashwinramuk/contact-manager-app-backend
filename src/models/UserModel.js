const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({    
    Email: {type : String,unique:true, required: true},
    Password: {type : String, required: true},

    // NOT COMPLITED 
    UserPicURL: String, //static one image	
    name: String, //	demo1	
    AccessDesignation: {type :String , required: true}	//normal, Admin, superAdmin, 
  })
  const UserModel = mongoose.model('<name of the collection for User >', UserSchema ); // NOT COMPLITED 
  module.exports = UserModel;