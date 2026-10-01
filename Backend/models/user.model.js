import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            index:true,
            trim:true
        },
        lastName:{
            type:String,
            required:true,
            index:true,
            trim:true
        },
        emailId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("invalid Email Address"+value);
                }
            }

        },
        password:{
            type:String,
            required:true,
            minLength:6
        }
    }
)

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    return token;
}

userSchema.methods.validatePasswords = async function(passwordByUser){
    const user = this;
    const passwordHash = this.password;
    const isPasswordValid = await bcrypt.compare(passwordByUser,passwordHash);

    return isPasswordValid;
}

const userModel = mongoose.model('User',userSchema);
export default userModel;