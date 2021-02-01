const Joi = require('joi');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const registerValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().max(128).label('Username'),
    password: Joi.string().required().min(8).max(128).label('Password'),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} must match the password' }),
    scope: Joi.array()
      .contains(Joi.string().valid('user'))
      .items(Joi.string().valid('user', 'admin')),
  });
  return schema.validate(data, options);
};

const loginValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data, options);
};

const changePasswordValidator = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required().label('Current password'),
    newPassword: Joi.string().required().min(8).max(128).label('New Password'),
    confirmNewPassword: Joi.any()
      .equal(Joi.ref('newPassword'))
      .required()
      .label('Confirm new password')
      .messages({ 'any.only': '{{#label}} must match the new password' }),
  });
  return schema.validate(data, options);
};

module.exports = { registerValidator, loginValidator, changePasswordValidator };
