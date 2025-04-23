const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password} = req.body;
  try {
    await authController.registerUser(username, password);
    res.status(201).json({ message: 'User registered successfully' });
    //console.log("WELCOME BITCH")
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login route for users
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authController.loginUser(username, password);
    res.status(200).json({ token });
    console.log("YOU GOT IT!")
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Guest login route
router.get('/guest', async (req, res) => {
  try {
    const token = await authController.guestLogin();
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error generating guest token' });
  }
});

router.put('/password', async(req, res) => {
  try {
    const { username, password, newpassword } = req.body;
    await authController.changeUserPassword(username, password, newpassword);
    res.status(200).json({ message: 'OK' });
    console.log("YEAH")
  } catch (err) {
    res.status(400).json({ message: err});
  }
})

module.exports = router;
