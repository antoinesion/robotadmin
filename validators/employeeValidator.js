const Joi = require('joi');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const newEmployeeValidator = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().max(64).label('First name'),
    lastName: Joi.string().required().max(64).label('Last name'),
    email: Joi.string().email().required().label('Email'),
    id: Joi.string().length(6).regex(/^\d+$/).label('ID').messages({
      'string.pattern.base': 'ID must contain only digits',
    }),
  });
  return schema.validate(data, options);
};

module.exports = newEmployeeValidator;
