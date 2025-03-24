import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SlideShow.css";

const SlideShow = () => {
  const [films, setFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get films from API
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies"); // Adjust your API endpoint
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };
    fetchFilms();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % films.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [films]);

  if (films.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slideshow-container">
      <div
        className="slideshow-image"
        style={{
          backgroundImage: `url(${films[currentIndex].BacgroudUrl})`,
        }}
      ></div>
      
      <div className="watch-button-div">
        <div className="film-info">
          <h2 className="film-title">{films[currentIndex].title}</h2>
          <br />
          <p className="film-rating">IMDB: {films[currentIndex].rating}</p>
          <br />
          <p className="film-description">{films[currentIndex].description}</p>
        </div>
        <div className="button-watch">
          <Link to={`/movie/${films[currentIndex].id}`} className="movie-link">
            <button className="watch-button">ფილმის ყურება</button>
          </Link>
        </div>
      </div>

      <div className="items-container">
        {films.map((film, index) => (
          <div
            key={film.id}
            className={`item ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${film["Slider-img"]})` }}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>

      <div className="pagination">
        {films.map((film, index) => (
          <div
            key={film.id}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
