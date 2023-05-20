import { Router } from "express";
import auth from "./authRouter.js";
import urls from "./urlsRouter.js";
import users from "./usersRouter.js";

const router = Router()

router.use(auth)
router.use(urls)
router.use(users)

export default router

