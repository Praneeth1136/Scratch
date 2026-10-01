import express from "express";
import todoModel from "../models/todo.model.js";
import chatModel from "../models/chat.model.js";

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:"App is running"})
})


let todos = [
    {id:1,title:"Learn Express",completed:false},
    {id:2,title:"Practise APIs",completed:false}
]

app.get("/todos",async(req,res)=>{
    try{
        const objs = await todoModel.find();
        res.status(200).json(objs);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.get("/todos/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await todoModel.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

// app.post("/todos",(req,res)=>{
//     const todo = req.body;

//     todos.push(todo);

//     res.json(todos);
// })

app.put("/todos/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const user = await todoModel.findByIdAndUpdate(id,updatedData);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error:err.message});
    }
    
})

app.post("/todos",async(req,res)=>{
    try{
        const obj = req.body;
        const newTodo = await todoModel.create(obj);
        res.status(200).json(newTodo);

    }catch(err){
        res.status(500).json({error:err.message});
    }

})


app.post("/user",async(req,res)=>{
    try{
        const obj = req.body;
        const newUser = await chatModel.create(obj);
        res.status(200).json(newUser);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

export default app;