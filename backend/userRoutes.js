import express from 'express';
import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Sign-up route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new Users({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, isAdmin: newUser.isAdmin } });
  } catch (error) {
    res.status(500).json({ message: 'Sign-up failed', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
});

// ✅ Get a single user by ID (for profile)
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
});


// Get all users (no password)
router.get('/', async (req, res) => {
  try {
    const users = await Users.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


export default router;
