import { Router } from "express";
import auth from "./authRouter.js";

const router= Router()

router.use(auth)

export default router

