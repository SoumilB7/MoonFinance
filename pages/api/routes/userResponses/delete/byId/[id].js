import ConnectToDB from "@/server/config/connect.db";
import userResponse from "@/server/model/userResponses.model";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    try {
      await ConnectToDB();
      const { id } = req.query;
      const result = await userResponse.deleteOne({ _id: id });
      console.log("data delete ");
      if (result.deletedCount == 0) {
        res.status(404).json({ message: "MongoDb id not found" });
      }
      {
        res.status(200).json({
          message: "User response deleted",
          result: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
