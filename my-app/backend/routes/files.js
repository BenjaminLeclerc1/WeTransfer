const express = require('express');
const multer = require('multer'); // Pour gérer l'upload des fichiers
const File = require('../models/File');
const User = require('../models/User');
const path = require('path');
const authenticate = require('./auth');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Dossier temporaire pour les fichiers


// Upload d'un fichier sécurisé
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  const file = req.file;
  console.log(`Uploading file for user ID: ${req.userId}`); // Affiche l'ID utilisateur

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

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

    console.log(`File uploaded successfully for user ID: ${req.userId}`); // Affiche confirmation de l'upload
    res.status(201).json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error(`Error during upload for user ID ${req.userId}: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});




// Générer un lien de partage temporaire sécurisé
router.get('/:fileId/share', authenticate, async (req, res) => {
  const { fileId } = req.params;
  const expirationTime = 24 * 60 * 60 * 1000; // 24 heures

  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Vérifie que l'utilisateur connecté est le propriétaire du fichier
    if (file.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "You do not have access to share this file" });
    }

    file.expiresAt = new Date(Date.now() + expirationTime);
    await file.save();

    const shareLink = `${req.protocol}://${req.get('host')}/files/${fileId}/download`;
    res.json({ shareLink, expiresAt: file.expiresAt });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});






// Télécharger un fichier sécurisé
router.get('/:fileId/download', authenticate, async (req, res) => {
  const { fileId } = req.params;
  console.log(`Attempt to access download for file ID: ${fileId}`);
  console.log(`User ID ${req.userId} attempting to download file ID: ${fileId}`); // Affiche l'ID utilisateur et du fichier

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Vérifie si l'utilisateur est bien le propriétaire du fichier
    if (file.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "You do not have access to this file" });
    }

    res.download(file.path, file.filename);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Exemple d'une route Express pour récupérer des fichiers
router.get('/myfiles', authenticate, async (req, res) => {
  try {
    const files = await File.find({ userId: req.userId }); // Récupère les fichiers de l'utilisateur connecté
   console.log(files);
   
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




//supprimer un fichier

router.delete('/files/:id', async (req, res) => {
  try {
      const file = await File.findById(req.params.id);
      if (!file) {
          return res.status(404).json({ message: 'Fichier introuvable.' });
      }

      // Supprimer le fichier du système de fichiers
      fs.unlinkSync(path.join(__dirname, '../uploads', file.filename));

      // Supprimer le fichier de la base de données
      await File.findByIdAndDelete(req.params.id);

      res.json({ message: 'Fichier supprimé avec succès.' });
  } catch (error) {
      console.error('Erreur lors de la suppression du fichier', error);
      res.status(500).json({ message: 'Erreur lors de la suppression du fichier.' });
  }
});



module.exports = router;
