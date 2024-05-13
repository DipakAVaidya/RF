const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser, findUserByEmail } = require('../models/model');

// Registration

const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    registerUser({ username, email, password: hashedPassword }, (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'An error occurred during registration' });
        return;
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    findUserByEmail(email, async (err, user) => {
      if (err) {
        console.error('Error finding user:', err);
        res.status(500).json({ error: 'An error occurred during login' });
        return;
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUserController, loginUserController };