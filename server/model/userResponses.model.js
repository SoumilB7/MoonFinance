const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
    userId:{
      type: String,
      required :true
    },
    questions:{
        type:Object,
        required: true
      },
      risk:{
        type:Number
      }
      ,
      diversity:{
        type:Number
      },
      stablity:{
        type:Number
      }
      
    

});

const userResponse = mongoose.models.userResponse || mongoose.model("userResponse", userResponseSchema);
module.exports = userResponse;
