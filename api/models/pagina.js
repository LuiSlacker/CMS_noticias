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
    title: {
      type: String,
    },
    question: {
      type: String,
    },
    options: {
      type: [{
        name: String,
        votes: {
          type: Number,
          default: 0,
        },
      }],
    },
  },
  notices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notice' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Pagina', PaginaModel);
