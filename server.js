// server.js (Backend)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); // Your database connection setup
const authRoutes = require('./routes/authRoutes'); // Authentication routes (if needed)

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Authentication routes (if needed)
app.use('/api/auth', authRoutes);

// Add movie (POST)
app.post('/api/movies/add', (req, res) => {
  const { title, description, poster, videoUrl, show_in_slider } = req.body;

  const query = 'INSERT INTO movies (title, description, poster, videoUrl, show_in_slider) VALUES (?, ?, ?, ?, ?)';
  const values = [title, description, poster, videoUrl, show_in_slider];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting movie:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send({ message: 'Movie added successfully', data: result });
  });
});

// Get all movies (GET)
app.get('/api/movies', (req, res) => {
  const searchQuery = req.query.query || "";

  const query = searchQuery
    ? 'SELECT * FROM movies WHERE title REGEXP ?'
    : 'SELECT * FROM movies'; // If no search query, return all movies

  db.query(query, [searchQuery], (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err);
      return res.status(500).send('Server error');
    }
    res.json(results); // Return the list of movies
  });
});

// Get movie by ID (GET)
app.get('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const query = 'SELECT * FROM movies WHERE id = ?';

  db.query(query, [movieId], (err, result) => {
    if (err) {
      console.error('Error fetching movie:', err);
      return res.status(500).send('Server error');
    }
    if (result.length === 0) {
      return res.status(404).send('Movie not found');
    }
    res.json(result[0]); // Return the movie object
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
