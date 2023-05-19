import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import { getMe } from "../controllers/usersControllers.js";

const users=Router()

users.get("/users/me",authValidation,getMe)

export default users