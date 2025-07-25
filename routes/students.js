import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { study, extracurricular, sleep, social, physical, gpa } = req.body;
  db.run(`INSERT INTO students (study, extracurricular, sleep, social, physical, gpa) 
          VALUES (?, ?, ?, ?, ?, ?)`,
    [study, extracurricular, sleep, social, physical, gpa],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Student lifestyle data added' });
    });
});

export default router;
