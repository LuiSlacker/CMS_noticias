'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoticeModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  likes: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notice', NoticeModel);
