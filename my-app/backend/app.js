require('dotenv').config(); // Charge les variables d'environnement
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const fileRoutes = require('./routes/files');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/files', fileRoutes);

// Test de connexion (Page d'accueil)
app.get('/', (req, res) => {
    res.send('Hello, Dockerized Node.js App with MongoDB!');
});

// Variables d'environnement
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongodb:27017/mydatabase";

// Connexion à MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});