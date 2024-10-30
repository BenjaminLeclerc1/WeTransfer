const express = require('express');
const mongoose = require('mongoose');
const User = require('./User'); // Import du modèle User

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongodb:27017/mydatabase";

app.use(express.json()); // Middleware pour parser les JSON

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Route pour créer un nouvel utilisateur
app.post('/users', async (req, res) => {
  const { id, email } = req.body;

  try {
    const user = new User({ id, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Dockerized Node.js App with MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
