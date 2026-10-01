import {Router} from "express";
import {validateSignUp,validateLogin} from "../validators/auth.validator.js";
import {register,login} from "../controller/auth.controller.js"

const authRouter = Router();

authRouter.post("/register",validateSignUp,register);
authRouter.post("/login",validateLogin,login);

export default authRouter;