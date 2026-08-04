const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const saltRounds = 10;

// POST /api/auth/signup - Creates a new user
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "Provide email, password and username" });
    }

    // Check if user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user
    const createdUser = await User.create({ email, username, password: hashedPassword });
    
    // Never send the password back to the client!
    const user = { email: createdUser.email, username: createdUser.username, _id: createdUser._id };
    res.status(201).json({ user });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/auth/login - Verifies email and password and returns a JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Provide email and password." });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "User not found." });
    }

    // Compare the provided password with the hashed one in the database
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      // Create the payload (the data inside the token)
      const payload = { _id: foundUser._id, email: foundUser.email, username: foundUser.username };

      // Generate the token
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "6h" });

      // Send the token to the client
      res.status(200).json({ authToken });
    } else {
      res.status(401).json({ message: "Unable to authenticate the user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /api/auth/verify - Used by React to verify the token is valid
router.get("/verify", isAuthenticated, (req, res) => {
  // If the middleware passes, the token is good. 
  // req.payload contains the user data we attached in the middleware
  res.status(200).json(req.payload);
});

module.exports = router;