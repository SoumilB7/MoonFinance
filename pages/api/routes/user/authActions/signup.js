import ConnectToDB from "@/server/config/connect.db";
import Users from "@/server/model/users.model";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    try {
      await ConnectToDB();

      const { name, email, password, mobileNumber, userUid, authType } =
        await req.body;
      const saltRounds = 10;
      const existingUser = await Users.findOne({ email });
      let hashedPassword = "";
      if (authType == "") {
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        hashedPassword = await bcrypt.hash(password, saltRounds);
      }

      const newUser = new Users({
        name,
        email,
        mobileNumber,
        password: hashedPassword,
        userUid,
      });
      await newUser.save();

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
