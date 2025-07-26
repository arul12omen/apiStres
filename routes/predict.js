import express from 'express';
import { spawn } from 'child_process';
import db from '../db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { study, extracurricular, sleep, social, physical, gpa, user_id } = req.body;

  const input = [study, extracurricular, sleep, social, physical, gpa].map(String);
  const py = spawn('python', ['svm_predict.py', ...input]);

  let result = '';
  let errorOccurred = false;

  py.stdout.on('data', (data) => {
    result += data.toString();
  });

  py.stderr.on('data', (data) => {
    errorOccurred = true;
    console.error(`stderr: ${data}`);
  });

  py.on('close', (code) => {
    if (code === 0 && !errorOccurred) {
      const prediction = result.trim();

      try {
        if (user_id) {
          const stmt = db.prepare(`
            INSERT INTO history 
              (user_id, study, extracurricular, sleep, social, physical, gpa, result)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `);
          stmt.run(user_id, study, extracurricular, sleep, social, physical, gpa, prediction);
        }

        res.json({ prediction });
      } catch (err) {
        console.error('DB error:', err);
        res.status(500).json({ error: 'Failed to save history' });
      }
    } else {
      res.status(500).json({ error: 'Prediction failed or invalid input' });
    }
  });
});

export default router;
