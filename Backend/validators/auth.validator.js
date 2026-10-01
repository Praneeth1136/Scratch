import validator from "validator";

export const validateSignUp = (req,res,next)=>{
    const{firstName,lastName,email,password} = req.body;

    if(!firstName || !lastName){
        return res.status(400).json({message:"Please enter a valid name"});
    }
    if(!email || !validator.isEmail(email)){
        return res.status(400).json({message:"Please enter a valid email address"});
    }
    if(!password || !validator.isStrongPassword(password)){
        return res.status(400).json({message:"Please enter a strong password"});
    }
    next();
}

// export const validateLogin = (req)=>{
//     const {email,password} = req.body;

    
// }