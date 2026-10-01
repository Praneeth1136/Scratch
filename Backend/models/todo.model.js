import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:String,
    completed:Boolean
})

const todoModel = mongoose.model('Todo',todoSchema);

export default todoModel;