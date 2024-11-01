
const jwt = require('jsonwebtoken');
const secretKey = 'wetransfer';

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : req.query.token;


  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
  