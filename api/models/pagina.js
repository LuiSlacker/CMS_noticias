'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaginaModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // poll: {
  //   question: {
  //     type: String,
  //   },
  //   options: [{ type: String }],
  // },
  notices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notice' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Pagina', PaginaModel);
