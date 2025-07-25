import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, hashed],
    function (err) {
      if (err) return res.status(400).json({ error: 'Username already exists' });
      res.json({ id: this.lastID, message: 'User registered' });
    });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
  if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });

  console.log('User found:', user);
  console.log('Entered password:', password);
  console.log('Stored hash:', user.password);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ user_id: user.id, username: user.username });
});
});

export default router;
