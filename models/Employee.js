const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 64,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 64,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 6,
  },
});

mongoose.models = {};
module.exports = mongoose.model('Employee', EmployeeSchema, 'Employees');
