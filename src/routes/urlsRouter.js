import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import { getUrlById, postShorten, redirectUserUrl } from "../controllers/urlsControllers.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { postShortenSchema } from "../schemas/postShortenSchema.js";

const urls=Router()

urls.post("/urls/shorten",authValidation,validateSchema(postShortenSchema),postShorten)
urls.get("/urls/:id",getUrlById)
urls.get("/urls/open/:shortUrl",redirectUserUrl)

export default urls