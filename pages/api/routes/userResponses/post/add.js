import ConnectToDB from "@/server/config/connect.db";
import userResponse from "@/server/model/userResponses.model";
import { calcDiversity } from "@/server/Utils/diversity";
import { calcRisk } from "@/server/Utils/risk";
import { calcStability } from "@/server/Utils/stability";
import { interpolate } from "framer-motion";

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
    const { userId, questions, maxQuestions } = req.body;
    try {
      await ConnectToDB();
      //Handle existing user
      const existingUserResponse = await userResponse.findOne({
        userId: userId,
      });
      console.log("lenght of questions array");
      const questionsLength = Object.keys(questions).length;

      if (existingUserResponse) {
        return res.status(500).json({
          message:
            "User already exist: please use update Api key if you want to update the database",
        });
      }
      console.log("req.body");
      console.log(req.body);
      if (!userId || !questions)
        return res
          .status(400)
          .json({ message: "userId and questions are required" });

      let risk = -1;
      let stablity = -1;
      let diversity = -1;
      if (questionsLength == maxQuestions) {
        risk = calcRisk(questions);
        stablity = calcStability(questions);
        diversity = calcDiversity(questions);
      }

      const data = await userResponse.create({
        userId,
        questions,
        risk,
        stablity,
        diversity,
      });

      if (questionsLength == maxQuestions) {
        res.status(200).json({
          message: "User response added",
          result: data,
        });
      } else {
        res.status(200).json({
          message: "User response added",
          result: data,
          warning:
            "User has not answered all the questions, Risk, Stability and Diversity will not be calculated",
        });
      }
    } catch (error) {
      console.log("ERRORR in positng data");
      console.log(error);

      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}
