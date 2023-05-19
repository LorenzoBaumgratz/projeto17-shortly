import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import { postShorten } from "../controllers/urlsControllers.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { postShortenSchema } from "../schemas/postShortenSchema.js";

const urls=Router()

urls.post("/urls/shorten",authValidation,validateSchema(postShortenSchema),postShorten)

export default urls