'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentModel = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Comment', CommentModel);
