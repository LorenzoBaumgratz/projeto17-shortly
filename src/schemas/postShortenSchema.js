import Joi from "joi";

export const postShortenSchema=Joi.object({
    url:Joi.link('#person').string().required()
})