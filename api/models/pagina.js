'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaginaModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  poll: {
    required: false,
    question: {
      type: String,
      required: true,
    },
    options: [{ type: String }],
  },
  notices: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Notice' },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Paginas', PaginaModel);
