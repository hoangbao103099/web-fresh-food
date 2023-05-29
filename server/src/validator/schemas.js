import Joi from 'joi'

export const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
    }),
    tokenSchema: Joi.object().keys({
        param: Joi.string()
            .regex(/^[0-9a-fA-F]{88}$/)
            .required()
    }),
    userRegisterSchema: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmpassword: Joi.string().min(6).required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required()
    })
}
