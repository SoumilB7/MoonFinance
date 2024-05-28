import mongoose from "mongoose";
import { optimizeImage } from "next/dist/server/image-optimizer";

const userSchema = new mongoose.Schema(
  {
    // userId:{
    //   type: String,
    //   required :true
    // },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
    },
    password: {
      type: String,
      optional: true,
    },
    userUid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
module.exports = Users;
