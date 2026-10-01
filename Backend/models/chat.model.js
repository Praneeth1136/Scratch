import mongoose from "mongoose";


const chatSchema = new mongoose.Schema(
    {
        name:String,
        married:Boolean
    }
)

const chatModel = mongoose.model('chat',chatSchema);

export default chatModel;
