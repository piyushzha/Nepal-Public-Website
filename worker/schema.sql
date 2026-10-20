-- ============================================================
-- NPSBS D1 Database Schema
-- Run: wrangler d1 execute npsbs-db --file=schema.sql
-- ============================================================

-- Users (admin accounts)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  name TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Students
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  sno TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  section TEXT DEFAULT 'A',
  dob TEXT,
  gender TEXT,
  parent TEXT,
  phone TEXT,
  address TEXT,
  transport INTEGER DEFAULT 0,
  transport_fee INTEGER DEFAULT 0,
  route TEXT,
  vest INTEGER DEFAULT 0,
  vest_fee INTEGER DEFAULT 0,
  tie INTEGER DEFAULT 0,
  tie_fee INTEGER DEFAULT 0,
  prev_due INTEGER DEFAULT 0,
  other_due INTEGER DEFAULT 0,
  photo TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Staff
CREATE TABLE IF NOT EXISTS staff (
  id TEXT PRIMARY KEY,
  sid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  subject TEXT,
  phone TEXT,
  salary INTEGER DEFAULT 0,
  class_assign TEXT,
  joined TEXT,
  photo TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Notices
CREATE TABLE IF NOT EXISTS notices (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'General',
  date TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Exams
CREATE TABLE IF NOT EXISTS exams (
  id TEXT PRIMARY KEY,
  term TEXT,
  date TEXT,
  subject TEXT NOT NULL,
  class TEXT,
  start_time TEXT,
  end_time TEXT,
  full_mark INTEGER DEFAULT 100,
  pass_mark INTEGER DEFAULT 40,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Grades
CREATE TABLE IF NOT EXISTS grades (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT,
  class TEXT,
  term TEXT,
  year TEXT,
  marks_json TEXT,
  total_marks INTEGER DEFAULT 0,
  max_marks INTEGER DEFAULT 0,
  percentage REAL DEFAULT 0,
  gpa REAL DEFAULT 0,
  grade TEXT,
  label TEXT,
  result TEXT DEFAULT 'FAIL',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Bills
CREATE TABLE IF NOT EXISTS bills (
  id TEXT PRIMARY KEY,
  bill_id TEXT UNIQUE,
  student_id TEXT NOT NULL,
  student_name TEXT,
  student_class TEXT,
  sno TEXT,
  term TEXT,
  year TEXT,
  monthly_fee INTEGER DEFAULT 0,
  exam_fee INTEGER DEFAULT 0,
  vest_fee INTEGER DEFAULT 0,
  tie_fee INTEGER DEFAULT 0,
  transport_fee INTEGER DEFAULT 0,
  prev_due INTEGER DEFAULT 0,
  other_due INTEGER DEFAULT 0,
  late_fee INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0,
  paid INTEGER DEFAULT 0,
  due INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Unpaid',
  pay_mode TEXT,
  pay_date TEXT,
  receipt TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Payments (audit log)
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  bill_id TEXT,
  student_id TEXT,
  student_name TEXT,
  student_class TEXT,
  term TEXT,
  year TEXT,
  total INTEGER DEFAULT 0,
  amount INTEGER DEFAULT 0,
  method TEXT,
  note TEXT,
  status TEXT,
  paid_at TEXT DEFAULT (datetime('now'))
);

-- Hostel
CREATE TABLE IF NOT EXISTS hostel (
  id TEXT PRIMARY KEY,
  student_id TEXT,
  student_name TEXT,
  month TEXT,
  room TEXT,
  amount INTEGER DEFAULT 0,
  meals TEXT,
  meal_fee INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Unpaid',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Library
CREATE TABLE IF NOT EXISTS library (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  student_id TEXT,
  student_name TEXT,
  issue_date TEXT,
  due_date TEXT,
  return_date TEXT,
  status TEXT DEFAULT 'Issued',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Attendance (key-value per class+date)
CREATE TABLE IF NOT EXISTS attendance (
  id TEXT PRIMARY KEY,
  class TEXT NOT NULL,
  date TEXT NOT NULL,
  student_id TEXT NOT NULL,
  status TEXT DEFAULT 'P',
  UNIQUE(class, date, student_id)
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  photo TEXT NOT NULL,
  caption TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Settings (key-value store)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Seed default admin user (password: School@2060)
-- bcrypt hash generated offline
INSERT OR IGNORE INTO users (id, username, password_hash, role, name)
VALUES (
  'admin-001',
  'admin',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'admin',
  'Administrator'
);

-- Seed default settings
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('schoolName', 'Nepal Public Secondary English Boarding School'),
  ('address', 'Samsi-5, Mahottari'),
  ('principal', 'Mr. Bineet Jha'),
  ('estd', '2060 B.S.'),
  ('phone', ''),
  ('email', ''),
  ('acadYear', '2081-2082');
