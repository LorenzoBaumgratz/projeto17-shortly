import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { authSchema } from "../schemas/authSchema.js";
import { signIn, signUp } from "../controllers/authControllers.js";

const auth=Router()

auth.post("/signup",validateSchema(authSchema),signUp)
auth.post("/signin",validateSchema(),signIn)

export default auth