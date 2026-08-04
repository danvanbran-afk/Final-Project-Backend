// 1. Load environment variables
require("dotenv").config();

// 2. Connect to the database
require("./db");

// 3. Import Express and create the app
const express = require("express");
const cors = require("cors");
const app = express();

// 4. Configure Middleware
// Allows our React app (which will run on port 5173) to make requests here
app.use(cors({ origin: ["http://localhost:5173"] })); 
// Parses incoming JSON requests
app.use(express.json()); 
// Parses incoming URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// 5. Basic Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Music Review Platform API" });
});

// 6. Start the Server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});