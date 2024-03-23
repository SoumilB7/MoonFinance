import ConnectToDB from "@/server/config/connect.db";
import userResponse from "@/server/model/userResponses.model";
// GET USER DATA
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    try {
      await ConnectToDB();
      const data = await userResponse.find({ userId: "sdfghjk" });
      res.send({ hello: data });
    } catch (error) {
      console.log(error);
    }
  }
}
