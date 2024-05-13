const jwt = require('jsonwebtoken');

const crypto = require('crypto');


const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret Key:', secretKey); // Generate a random 32-byte (256-bit) secret key

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, '5ed34807538348efd8149ed19a893655ed382bde35e6973c6e8bb47798718749'); // here we have to add jwt secret key
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;