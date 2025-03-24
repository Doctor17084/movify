const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // თქვენი DB კავშირი
const router = express.Router();
require('dotenv').config();

// **🔹 Check username & email availability**
router.post('/check-availability', (req, res) => {
  const { username, email } = req.body;

  db.query(
    'SELECT username, email FROM users WHERE username = ? OR email = ?',
    [username, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      const usernameAvailable = !result.some(user => user.username === username);
      const emailAvailable = !result.some(user => user.email === email);

      return res.status(200).json({ usernameAvailable, emailAvailable });
    }
  );
});

// **🔹 Register API (User Role Support)**
router.post('/register', async (req, res) => {
  const { username, email, password, role = 'User' } = req.body;

  try {
    db.query(
      'SELECT username, email FROM users WHERE username = ? OR email = ?',
      [username, email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }

        if (result.length > 0) {
          return res.status(400).json({
            message: 'მომხმარებლის სახელი ან ელ.ფოსტა უკვე არსებობს'
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
          [username, email, hashedPassword, role],
          (err) => {
            if (err) {
              return res.status(500).json({ message: 'Database error' });
            }
            res.status(200).json({ message: 'User registered successfully' });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Registration error' });
  }
});

// **🔹 Login API (JWT with Role)**
router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  const query = username 
    ? 'SELECT * FROM users WHERE username = ?' 
    : 'SELECT * FROM users WHERE email = ?';

  const value = username || email;

  db.query(query, [value], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, result[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // **JWT-ით Role-ის შენახვა**
    const token = jwt.sign(
      { userId: result[0].id, role: result[0].role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: result[0].role });
  });
});

// **🔹 Token Verification API (Returns Role)**
router.get('/verifyToken', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    const userId = decoded.userId;

    db.query(
      'SELECT username, email, role FROM users WHERE id = ?', 
      [userId], 
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: result[0] });
      }
    );
  });
});

module.exports = router;
