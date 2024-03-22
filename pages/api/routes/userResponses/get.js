import ConnectToDB from "@/server/config/connect.db"
import userResponse from "@/server/model/userResponses.model"
 // GET USER DATA 
export default async function  handler(req, res) {
    try {
        await ConnectToDB()
        const data = await userResponse.find({})
        res.send(data)
    } catch (error) {
        console.log(error)
    }    
}