import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import validator from 'validator';
import User from './models/User.js';
import { verifyToken } from './middleware/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// GET pages
app.get('/', (req, res) => res.redirect('/login'));
app.get('/register', (req, res) => res.render('register', { error: '' }));
app.get('/login', (req, res) => res.render('login', { error: '' }));
app.get('/secrets', verifyToken, (req, res) => {
  res.render('secrets', { user: req.user });
});

// Register
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.render('register', { error: 'Invalid email format.' });
  }

  const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,8}$/.test(password);
  if (!validPass) {
    return res.render('register', { error: 'Password must contain upper, lower, number & be 6–8 chars.' });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  try {
    await User.create({ name, email, password: hashedPass });
    res.redirect('/login');
  } catch (err) {
    res.render('register', { error: 'Email already in use.' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.render('login', { error: 'Invalid email format.' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('login', { error: 'Incorrect email or password.' });
  }

  const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.cookie('token', token, { httpOnly: true });
  res.redirect('/secrets');
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
