// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./pages.css";
import SlideShow from "../componenets/SlideShow";
import Laptopscrenncomponenet from "../componenets/Laptopscrenncomponenet";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current movie index
  const [hoveredMovie, setHoveredMovie] = useState(null); // Track which movie is hovered

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies") // Corrected API URL
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  // Function to go to the next movie
  const nextMovie = () => {
    if (currentIndex < movies.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to go to the previous movie
  const prevMovie = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= movies.length - 5;

  return (
    <div className="home-container">
      <section className="main-section">
        <SlideShow />
      </section>
      <div className="laptopscreen">
        <Laptopscrenncomponenet />
      </div>
      <div className="new-movie">
        <div className="new-movies headers">
          <span className="line"></span>
          <h2>
            ახალი <span style={{ color: "#ff5733" }}>დამატებული</span>
          </h2>
        </div>
        <div className="carousel-container">
          <div className="carousel-buttons">
            <button
              onClick={prevMovie}
              className={`carousel-button left ${isFirst ? "disabled" : ""}`}
              style={{ color: isFirst ? "#757575" : "white" }}
            >
              ←
            </button>
            <button
              onClick={nextMovie}
              className={`carousel-button right ${isLast ? "disabled" : ""}`}
              style={{ color: isLast ? "#757575" : "white" }}
            >
              →
            </button>
          </div>
          <div className="new-movie-item">
            {movies.slice(currentIndex, currentIndex + 5).map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="movie-item-line"
                onMouseEnter={() => setHoveredMovie(movie.id)} // ფილმის ჰოვერი
                onMouseLeave={() => setHoveredMovie(null)} // ჰოვერის გაჩერება
              >
                <div className="movie-poster-container">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  {/* IMDB რეიტინგი მხოლოდ როცა ფილმზე ჰოვერებთ */}
                  <div className={`rating-overlay ${hoveredMovie === movie.id ? "show" : ""}`}>
                  <span className="imdb-label">IMDB:</span> <span className="movie-rating">{movie.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
