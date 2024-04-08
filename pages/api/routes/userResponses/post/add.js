import ConnectToDB from "@/server/config/connect.db";
import userResponse from "@/server/model/userResponses.model";
import { calcDiversity } from "@/server/Utils/diversity";
import { calcRisk } from "@/server/Utils/risk";
import { calcStability } from "@/server/Utils/stability";

// -- -- CREATE -- --
export default async function handler(req, res) {
  // //EXPECTED Req.body
  //     ExpectedData = {
  //         userId : "sdfghjk",
  //         questions: [{question:"quesstion 1" , option: "this option "} , {question:"quesstion 2" , option: "another option "}, {question:"quesstion 2" , option: "another option "} ],

  //     }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    const { userId, questions } = req.body;
    try {
      await ConnectToDB();
      //Handle existing user
      const existingUserResponse = await userResponse.findOne({
        userId: userId,
      });
      if (existingUserResponse) {
        return res.status(500).json({
          message:
            "User already exist: please use update Api key if you want to update the database",
        });
      }

      const risk = calcRisk(questions);
      const stablity = calcStability(questions);
      const diversity = calcDiversity(questions);

      const data = await userResponse.create({
        userId,
        questions,
        risk,
        stablity,
        diversity,
      });
      res.status(200).json({
        message: "User response added",
        result: data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}
