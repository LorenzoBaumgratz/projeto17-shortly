import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { signIn, signUp } from "../controllers/authControllers.js";
import { signInSchema } from "../schemas/signInSchema.js";

const auth=Router()

auth.post("/signup",validateSchema(signUpSchema),signUp)
auth.post("/signin",validateSchema(signInSchema),signIn)

export default auth