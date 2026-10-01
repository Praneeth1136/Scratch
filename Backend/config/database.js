import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const MONGODB_URL = "mongodb+srv://hellogurupremakosame00_db_user:VC5NCxQ6t8ZQvntm@cluster0.0dvt64e.mongodb.net/";

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(err){
        console.error("MongoDB connection failed:", err);
        throw err;
    }
}

export default connectDB;