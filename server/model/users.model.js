import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // userId:{
    //   type: String,
    //   required :true
    // },
    name:{
      type:String,
    },
    email:{
      type:String,
    },
    mobileNumber:{
      type:String,
    },
    password:{
      type:String,
    },
},{timestamps: true});

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
module.exports = Users;