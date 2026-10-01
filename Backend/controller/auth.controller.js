import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"


export async function register(req,res){
    const {firstName,lastName,email,password} = req.body;

    const existingUser = await userModel.findOne({email});

    if(existingUser){
        return res.status(409).json({message:"User with this email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({firstName,lastName,email,password:hashedPassword});

    const token = await user.getJWT();

    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    })

    res.status(201).json({
        message:"User registered Successfully",
        success:true,
        user:{
            id:user._id,
            firstname:user.firstName,
            email:user.email
        }
    })

}


export async function login(req,res){
    const{email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message:"User doesn't exist",
        })
    }

    const isPasswordMatch = await user.validatePasswords(password);

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Password does'nt match"
        })
    }

    const token = await user.getJWT();
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
    })
    return res.status(200).json({
        message: "Login successful",
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
        },
    });
}