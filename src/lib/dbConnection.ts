import mongoose from "mongoose"
type ConnectionObject={
    isConnected?:number  
}
const connection:ConnectionObject={}
async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("already connected")
        return

    }
    try{
        const db=await mongoose.connect(process.env.MONGODB_URI||" ",{})
        connection.isConnected=db.connections[0].readyState
        console.log("connected successfully ")
    }
    catch(error){
        console.log(error,"database connection failed ! ")
        process.exit()
    }
}
export default dbConnect;