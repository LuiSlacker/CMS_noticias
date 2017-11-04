'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
require('mongoose-type-url');

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
    type: mongoose.SchemaTypes.Url,
  },
  likes: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notice', NoticeModel);
