const mongoose = require("mongoose")
async function ConnectToDB() {
   try {
       if(!process.env.MONGOURI) throw "MONGO_URI not found please config .env file "
       await mongoose.connect(
       process.env.MONGOURI );
       console.log("Connection open");
   } catch (error) {
       console.log("Error in connection to database ")
       console.log(error)
       
   }
  
 }
module.exports = ConnectToDB