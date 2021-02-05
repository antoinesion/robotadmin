const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 128,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxLength: 128,
  },
  scope: {
    type: Array,
    required: true,
    default: ['admin'],
  },
});

mongoose.models = {};
module.exports = mongoose.model('AdminUser', AdminUserSchema, 'AdminUsers');
