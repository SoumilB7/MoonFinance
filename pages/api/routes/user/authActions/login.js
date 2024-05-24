// pages/api/login.js

import ConnectToDB from "@/server/config/connect.db";
import Users from '@/server/model/users.model';
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    
    try {
      await ConnectToDB();
      
      const { email, password } = await req.body;
      // Find user by email
      const user = await Users.findOne({ email });

      // If user not found or password doesn't match, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // If credentials are valid, return success response
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}