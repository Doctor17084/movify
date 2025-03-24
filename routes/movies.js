// routes/movies.js
const express = require('express');
const db = require('../db');  // ბაზასთან კავშირი
const router = express.Router();

// ფილმების დამატება
router.post('/add-movies', (req, res) => {
  const movies = [
    {
      title: 'THE COVENANT (2023)',
      description: 'IMDB: 7.5\nწელი: 2023\nკარგი ფილმი',
      poster: 'https://example.com/poster1.jpg',
      videoUrl: 'https://movifyge.s3.eu-north-1.amazonaws.com/შეთანხმება+(1).mp4',
      show_in_slider: 1
    },
    
    // დამატება სხვა ფილმები აქ...
  ];

  const query = 'INSERT INTO movies (title, description, poster, videoUrl, show_in_slider) VALUES ?';
  const values = movies.map(movie => [
    movie.title,
    movie.description,
    movie.poster,
    movie.videoUrl,
    movie.show_in_slider
  ]);

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error inserting movies:', err);
      res.status(500).send('Error inserting movies');
    } else {
      res.status(200).send('Movies added successfully');
    }
  });
});

module.exports = router;
