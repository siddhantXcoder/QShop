const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'koiqwfoykhwiogpjpifwehgioqhogiqwqwghqighoyw'; // Use environment variable for security

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired.' });
      }
      return res.status(403).json({ message: 'Invalid or unauthorized token.' });
    }
    req.user = user;
    next(); 
  });
}

module.exports = authenticateToken;