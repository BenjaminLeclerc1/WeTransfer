const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quota: { type: Number, default: 2 * 1024 * 1024 * 1024 }, // Quota par défaut de 2 Go
  usedSpace: { type: Number, default: 0 } // Espace utilisé par l'utilisateur
});

const User = mongoose.model('User', userSchema);
module.exports = User;
