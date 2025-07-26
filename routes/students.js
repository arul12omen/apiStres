import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all student lifestyle data
router.get('/', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM students").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new student lifestyle data
router.post('/', (req, res) => {
  const { study, extracurricular, sleep, social, physical, gpa } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO students (study, extracurricular, sleep, social, physical, gpa) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(study, extracurricular, sleep, social, physical, gpa);

    res.json({ id: info.lastInsertRowid, message: 'Student lifestyle data added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
