import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /history/:user_id
router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;

  db.all(`SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC`, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

export default router;
