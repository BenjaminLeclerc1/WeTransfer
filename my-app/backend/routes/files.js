const express = require('express');
const multer = require('multer'); // Pour gérer l'upload des fichiers
const File = require('../models/File');
const User = require('../models/User');
const path = require('path');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Dossier temporaire pour les fichiers

// Upload d'un fichier
router.post('/upload', upload.single('file'), async (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  try {
    const user = await User.findById(userId);

    if (user.usedSpace + file.size > user.quota) {
      return res.status(400).json({ message: "Quota exceeded" });
    }

    const newFile = new File({
      userId: user._id,
      filename: file.originalname,
      path: file.path,
      size: file.size
    });

    user.usedSpace += file.size;
    await user.save();
    await newFile.save();

    res.status(201).json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Générer un lien de partage temporaire
router.get('/:fileId/share', async (req, res) => {
  const { fileId } = req.params;
  const expirationTime = 24 * 60 * 60 * 1000; // 24 heures

  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ message: "File not found" });

    file.expiresAt = new Date(Date.now() + expirationTime);
    await file.save();

    const shareLink = `${req.protocol}://${req.get('host')}/files/${fileId}/download`;
    res.json({ shareLink, expiresAt: file.expiresAt });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Télécharger un fichier
router.get('/:fileId/download', async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file || (file.expiresAt && file.expiresAt < Date.now())) {
      return res.status(404).json({ message: "File not found or link expired" });
    }

    res.download(file.path, file.filename);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
