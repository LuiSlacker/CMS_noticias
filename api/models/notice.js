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
  active: {
    type: Boolean,
    default: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
  timestamps: true,
});

NoticeModel.statics.queryWithFilter = function (queryParams) {
  const filterQueryObj = {
    $and: [
      { $or: [{ undefined: { $eq: queryParams.userId } }, { user: queryParams.userId }] },
    ],
  };
  return this.find(filterQueryObj);
};

module.exports = mongoose.model('Notice', NoticeModel);
