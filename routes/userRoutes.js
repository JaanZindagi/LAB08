import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data.js';
import { SECRET_KEY } from '../auth.js';

const router = express.Router();
const generateId = () => Math.random().toString(36).substr(2, 9);

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { id: generateId(), username, password: hashedPassword };
  users.push(user);

  res.status(201).json({ message: 'User registered successfully.' });
});




router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

export default router;