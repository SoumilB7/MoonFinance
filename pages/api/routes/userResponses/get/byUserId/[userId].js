import ConnectToDB from "@/server/config/connect.db";
import userResponse from "@/server/model/userResponses.model";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    try {
      await ConnectToDB();
      const { userId } = req.query;
      const data = await userResponse.find({ userId: userId });

      res.send(data);
    } catch (error) {
      console.log(error);
    }
  }
}
