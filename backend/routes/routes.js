const express = require('express');
const router = express.Router();
const { registerUserController, loginUserController } = require('../controllers/controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUserController);
router.post('/login', loginUserController);

// Protected route example
router.get('/profile', authMiddleware, (req, res) => {
  // Access the user ID from the decoded token
  const userId = req.userId;

  // Fetch user data from the database based on the userId
  // ...

  // Return the user data
  res.json({ userId, /* other user data */ });
});

module.exports = router;