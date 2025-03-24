const axios = require('axios');

// ფილმის მონაცემები
const movieData = {
  title: "The Covenant",
  description: "A movie about...",
  poster: "https://example.com/poster.jpg",
  videoUrl: "https://movifyge.s3.eu-north-1.amazonaws.com/video.mp4",
  show_in_slider: true
};

// POST მოთხოვნა
axios.post('http://localhost:5000/api/movies/add', movieData)
  .then(response => {
    console.log('Movie added successfully:', response.data);
  })
  .catch(error => {
    console.error('There was an error adding the movie!', error);
  });
