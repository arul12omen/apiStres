import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./students.db');

db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  study REAL,
  extracurricular REAL,
  sleep REAL,
  social REAL,
  physical REAL,
  gpa REAL,
  result TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);


  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    study REAL,
    extracurricular REAL,
    sleep REAL,
    social REAL,
    physical REAL,
    gpa REAL
  )`);
});

export default db;
