const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  hostingProvider: String,
  loginCredentials: String,
  emailCredentials: String,
  expiryDate: Date,
  renewalCharge: Number,

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 🔑 Link to user
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
