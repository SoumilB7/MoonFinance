import ConnectToDB from "@/server/config/connect.db"
import userResponse from "@/server/model/userResponses.model"
import { calcDiversity } from "@/server/Utils/diversity"
import { calcRisk } from "@/server/Utils/risk"
import { calcStability } from "@/server/Utils/stability"


// -- -- CREATE -- --
export default async function  handler(req, res) {
    // //EXPECTED Req.body
    //     ExpectedData = {
    //         userId : "sdfghjk",
    //         questions: [{question:"quesstion 1" , option: "this option "} , {question:"quesstion 2" , option: "another option "}, {question:"quesstion 2" , option: "another option "} ],
            

    //     }
       

    try {
        await ConnectToDB()
        const risk = calcRisk();
        const stablity = calcStability();
        const diversity = calcDiversity();
        const {userId , questions} = req.body;
        const data = await userResponse.create({userId , questions , risk , stablity , diversity})
        console.log("data added")
        res.send(data)
    } catch (error) {
        console.log(error)
    }    
}