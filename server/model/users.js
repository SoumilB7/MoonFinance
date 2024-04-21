import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{
      type: String,
      required :true
    },
    name:{
      type:String,
    },
    email:{
      type:String,
    }
},{timestamps: true});

const Users = mongoose.models.users || mongoose.model("Users", userSchema);
module.exports = Users;
