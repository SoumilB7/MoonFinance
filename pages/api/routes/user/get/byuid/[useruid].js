import ConnectToDB from "@/server/config/connect.db";
import userResponse from "@/server/model/userResponses.model";
import Users from "@/server/model/users.model";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    try {
      console.log("trigerer");
      await ConnectToDB();
      const { useruid } = req.query;
      const data = await Users.find({ userUid: useruid });

      res.send(data);
    } catch (error) {
      console.log(error);
    }
  }
}
