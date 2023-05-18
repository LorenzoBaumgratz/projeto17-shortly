import Joi from "joi";

export const postShortenSchema=Joi.object({
    url:Joi.string().required()
})