import ConnectToDB from "@/server/config/connect.db";
import userResponse from "@/server/model/userResponses.model";
import { calcDiversity } from "@/server/Utils/diversity";
import { calcRisk } from "@/server/Utils/risk";
import { calcStability } from "@/server/Utils/stability";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    try {
      await ConnectToDB();
      const { userId } = req.query;
      const updateFields = req.body;

      const existingUserResponse = await userResponse.findOne({
        userId: userId,
      });
      if (!existingUserResponse) {
        return res.status(404).json({ message: "User not found" });
      }

      if (updateFields.questions) {
        for (const [key, value] of Object.entries(updateFields.questions)) {
          existingUserResponse.questions[key] = value;
        }
        updateFields.risk = calcRisk(existingUserResponse.questions);
        updateFields.diversity = calcDiversity(existingUserResponse.questions);
        updateFields.stablity = calcStability(existingUserResponse.questions);
        updateFields.questions = existingUserResponse.questions;
      }
      const result = await userResponse.updateOne(
        { userId: userId },
        { $set: updateFields }
      );

      res.status(200).json({
        message: "User response updated successfully",
        result: result,
      });

      res.send(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}
