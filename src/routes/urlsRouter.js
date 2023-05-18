import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import { postShorten } from "../controllers/urlsControllers.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { postShortenSchema } from "../schemas/postShortenSchema.js";

const urls=Router()

urls.use(authValidation)
urls.post("/urls/shorten",validateSchema(postShortenSchema),postShorten)

export default urls