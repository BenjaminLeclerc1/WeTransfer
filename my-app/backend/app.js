require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const fileRoutes = require('./routes/files');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080', // Remplace par l'origine du frontend
}));

app.use(express.json());
app.use('/users', userRoutes);
app.use('/files', fileRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Dockerized Node.js App with MongoDB!');
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongodb:27017/mydatabase";

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
