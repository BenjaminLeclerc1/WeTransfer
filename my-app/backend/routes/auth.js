// middleware/auth.js
const jwt = require('jsonwebtoken');
const secretKey = 'wetransfer';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId; // Ajoute l'ID utilisateur à la requête
    console.log(`User ID from token: ${req.userId}`); // Affiche l'ID utilisateur
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
