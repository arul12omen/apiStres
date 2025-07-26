import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /history/:user_id
router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;

  try {
    const stmt = db.prepare(`SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC`);
    const rows = stmt.all(userId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
