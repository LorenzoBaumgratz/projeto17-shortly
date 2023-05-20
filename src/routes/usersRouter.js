import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import { getMe, ranking } from "../controllers/usersControllers.js";

const users=Router()

users.get("/users/me",authValidation,getMe)
users.get("/ranking",ranking)

export default users