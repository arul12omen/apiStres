import express from 'express';
import db from '../db.js'; // db adalah instance dari better-sqlite3
import bcrypt from 'bcrypt';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    // Cek apakah username sudah ada
    const check = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (check) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Simpan user baru
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const info = stmt.run(username, hashed);

    res.json({ id: info.lastInsertRowid, message: 'User registered' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    console.log('User found:', user);
    console.log('Entered password:', password);
    console.log('Stored hash:', user.password);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ user_id: user.id, username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
