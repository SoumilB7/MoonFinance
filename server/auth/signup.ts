"use server";
import ConnectToDB from "../config/connect.db";
import Users from "../model/users.model";
import bcrypt from "bcrypt";
import { generateUUID } from "../utils/uuid";

interface SignupData {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export async function signup(data: SignupData) {
  console.log(data);
  const { username, email, password, phone } = data;
  const name = username;

  try {
    await ConnectToDB();

    // const { name, email, password, mobileNumber, authType } = req.body;

    const saltRounds = 10;
    const existingUser = await Users.findOne({ email });

    // if (authType === "") {
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    // }
    const userId = generateUUID();
    const newUser = new Users({
      name,
      email,
      phone,
      password: hashedPassword,
      userUid: userId,
    });
  
    await newUser.save();
    const serializedUser = newUser.toObject();

    //send otp for verification

    return {
      id: serializedUser._id,
      name: serializedUser.name,
      email: serializedUser.email,
      userUid: serializedUser.userUid,
      createdAt: serializedUser.createdAt,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}