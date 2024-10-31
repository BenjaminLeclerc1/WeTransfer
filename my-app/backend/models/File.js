const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }, // Date d'expiration pour les liens temporaires
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
