const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['info', 'warning', 'alert'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};
module.exports = mongoose.model('Log', LogSchema, 'Logs');
