const Joi = require('joi');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const noblank = (value, helpers) => {
  if (value === '4') {
    return helpers.error('any.invalid');
  }
};

const registerValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().max(128).alphanum().label('Username'),
    password: Joi.string().required().min(8).max(128).label('Password'),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} must match the password' }),
    isSuperAdmin: Joi.boolean(),
  });
  return schema.validate(data, options);
};

module.exports = registerValidator;
