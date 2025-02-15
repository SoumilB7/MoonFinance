"use server"
import ConnectToDB from "../config/connect.db"
import Users from "../model/users.model"
import bcrypt from "bcrypt"

interface LoginData{
    email:string,
    password:string,
}

export async function login (data: LoginData){

    try {
        //console.log(data);
        const {email,password}=data;
        await ConnectToDB();

    
        // Validate email and password
        if (!email || !password) {
          throw new Error("Email and password are required");
        }
    
        // Find user by email
        const user = await Users.findOne({ email });
        console.log(user)
        // If user not found or password doesn't match, return error
        if (!user || !user.password || !bcrypt.compare(password, user.password)) {
          throw new Error("Invalid credentials");
        }
    
    
        // If credentials are valid, return success response and redirect user to dashboard
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
      }
}