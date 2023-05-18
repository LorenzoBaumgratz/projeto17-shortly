import Joi from "joi";

export const signUpSchema=Joi.object({
    name:Joi.required().string().min(1),
    email:Joi.required().email(),
    password:Joi.required().string().min(1),
    confirmPassword:Joi.required().string().min(1)
})