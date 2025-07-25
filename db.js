import Database from 'better-sqlite3';

const db = new Database('./students.db');

// Jalankan pembuatan tabel langsung dengan db.exec (sinkron)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS history (
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
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    study REAL,
    extracurricular REAL,
    sleep REAL,
    social REAL,
    physical REAL,
    gpa REAL
  );
`);

export default db;
