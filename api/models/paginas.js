'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaginaModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Paginas', PaginaModel);
