// src/componenets/Movfilms.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";  // Assuming VideoPlayer component exists

const Movfilms = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`) // Correct API URL for individual movie
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-container">
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <VideoPlayer videoUrl={movie.videoUrl} />
    </div>
  );
};

export default Movfilms;
