// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, JWT in Node.js!');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// Import required packages
const express = require('express');
const jwt = require('jsonwebtoken');

// Create an Express application
const app = express();

// Set the port number for the server
const port = 3000;

// Secret key for JWT signature (keep this secret in a real-world scenario)
const secretKey = 'your-secret-key';

// Mock user data (replace with a database in a real-world scenario)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Use JSON middleware to parse incoming requests with JSON payloads
app.use(express.json());

// User login endpoint
app.post('/login', (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Check if the username and password match a user in the database
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    // Return 401 status for unauthorized access
    return res.status(401).json({ message: 'Invalid credentials' });
  }
//   else{
//     return res.json("HHmmm")
//   }

  // Create a JWT token with user information and set expiration to 1 hour
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  // Return the token in the response
  res.json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  // Respond with a message indicating successful access to the protected route
  res.json({ message: 'Protected route accessed successfully!' });
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  // Extract the token from the 'Authorization' header
//   const token = req.header('Authorization');

const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Return 401 status for unauthorized access if token is not provided
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Verify the token using the secret key
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      // Return 403 status for forbidden access if the token is invalid
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Attach user information to the request for further processing
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  });
}

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});