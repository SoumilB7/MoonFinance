// pages/api/login.js

import ConnectToDB from "@/server/config/connect.db";
import Users from '@/server/model/users';
import bcrypt from "bcrypt";

const saltRounds = 10;

export default async function handler(req, res) {
    if(req.method !== 'POST'){
        res.status(405).json({ message: "Method not allowed" });
    return;
    }else{
        const { name, email, password, mobileNumber } = req.body;

  try {
    await ConnectToDB();

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Users({ name, email, password: hashedPassword, mobileNumber });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
    }

  
}
