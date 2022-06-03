const Joi = require('@hapi/joi');

//Registration Validation
const registerValidation = data => {
    const schema = {
        username: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),

    };
    return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation;