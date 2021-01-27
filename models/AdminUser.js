const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 128,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 128,
  },
  scope: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

mongoose.models = {};
module.exports = mongoose.model('AdminUser', AdminUserSchema, 'AdminUsers');
