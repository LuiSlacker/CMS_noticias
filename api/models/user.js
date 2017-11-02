'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Users', UserModel);
