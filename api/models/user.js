'use strict';

const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isEditor: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  timestamps: true,
});

UserModel.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserModel);
