import Joi from "joi";

export const signInSchema=Joi.object({
    email:Joi.required().email(),
    password:Joi.required().string().min(1)
})