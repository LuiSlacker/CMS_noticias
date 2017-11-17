'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentModel = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Comment', CommentModel);
