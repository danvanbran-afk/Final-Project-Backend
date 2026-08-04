const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    // Extract the token from the authorization header (Format: "Bearer ")
    const token = req.headers.authorization.split(" ")[1];
    
    // Verify the token using our secret
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    
    // Attach the payload (user data) to the request object
    req.payload = payload;
    
    // Move to the next function/route
    next();
  } catch (error) {
    // If no token or invalid token, return a 401 Unauthorized
    res.status(401).json({ message: "Token not provided or not valid" });
  }
};

module.exports = { isAuthenticated };