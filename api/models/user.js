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
    unique: true,
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
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  assignedPages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pagina' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserModel);
