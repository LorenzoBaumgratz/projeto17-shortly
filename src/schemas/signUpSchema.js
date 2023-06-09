import Joi from "joi";

export const signUpSchema=Joi.object({
    name:Joi.string().min(1).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(1).required(),
    confirmPassword:Joi.string().min(1).required()
})