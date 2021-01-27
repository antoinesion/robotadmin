const Joi = require('joi')

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
}

const registerValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .max(128)
      .label('Username'),
    password: Joi.string()
      .required()
      .min(8)
      .max(128)
      .label('Password'),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm Password')
      .messages({ 'any.only': '{{#label}} must match the password' }),
    scope: Joi.string().valid('user', 'admin')
  })
  return schema.validate(data, options)
}

const loginValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  })
  return schema.validate(data, options)
}

module.exports = { registerValidator, loginValidator }
