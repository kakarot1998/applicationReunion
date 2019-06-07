const mongoose = require('mongoose');

const UserTable = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  message: {
    type : String
  }
});

const userModel = mongoose.model('userModel', UserTable);

module.exports = userModel;