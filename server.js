import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import os from 'os';

import studentRoutes from './routes/students.js';
import predictRoutes from './routes/predict.js';
import authRoutes from './routes/auth.js';
import historyRoutes from './routes/history.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/students', studentRoutes);
app.use('/predict', predictRoutes);
app.use('/auth', authRoutes);
app.use('/history', historyRoutes);

// Fungsi untuk mendapatkan IP lokal
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, () => {
  const ip = getLocalIPAddress();
  console.log(`Server running at:`);
  console.log(`- http://localhost:${PORT}`);
  console.log(`- http://${ip}:${PORT}`);
});
