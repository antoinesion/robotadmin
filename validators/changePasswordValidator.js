const Joi = require('joi');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const changePasswordValidator = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required().label('Current password'),
    newPassword: Joi.string()
      .required()
      .min(8)
      .max(128)
      .invalid(Joi.ref('currentPassword'))
      .label('New Password')
      .messages({
        'any.invalid': '{{#label}} must not be the same as current password',
      }),
    confirmNewPassword: Joi.any()
      .valid(Joi.ref('newPassword'))
      .required()
      .label('Confirm new password')
      .messages({ 'any.only': '{{#label}} must match the new password' }),
  });
  return schema.validate(data, options);
};

module.exports = changePasswordValidator;
