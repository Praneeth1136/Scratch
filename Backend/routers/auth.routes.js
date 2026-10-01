import {Router} from "express";
import {validateSignUp} from "../validators/auth.validator.js";
import {register} from "../controller/auth.controller.js"

const authRouter = Router();

authRouter.post("/register",validateSignUp,register);

export default authRouter;