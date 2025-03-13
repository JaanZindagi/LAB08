import jwt from 'jsonwebtoken';
import { users } from './data.js';

const SECRET_KEY = 'your-secret-key';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = users.find((u) => u.id === decoded.id);
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export { authenticate, SECRET_KEY };