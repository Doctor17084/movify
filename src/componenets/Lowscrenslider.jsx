import React, { useState, useEffect, useRef } from "react";
import "./c.css"; // Importing the custom CSS file

const Lowscrenslider = () => {
  const [films, setFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  const sliderRef = useRef(null); // We can use this to attach to the slider container

  // Get films from API
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies"); // Your API endpoint
        const data = await response.json();
        setFilms(data); // Store fetched films data in state
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };
    fetchFilms();
  }, []);

  // Function to handle mouse hover and change the image
  const handleMouseOver = (index) => {
    setCurrentIndex(index);
  };

  // Function to handle click and change the image
  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle drag start
  const handleDragStart = (e) => {
    setIsDragging(true);
    const startX = e.clientX || e.touches[0].clientX;
    setStartPosition(startX);
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (isDragging) {
      const moveX = e.clientX || e.touches[0].clientX;
      setEndPosition(moveX);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (isDragging) {
      if (endPosition - startPosition > 100) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % films.length); // Swipe right to next slide
      } else if (startPosition - endPosition > 100) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + films.length) % films.length); // Swipe left to previous slide
      }
      setIsDragging(false); // Reset dragging state
    }
  };

  // To prevent page from scrolling while dragging on mobile devices
  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  if (films.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={sliderRef}
      className="lowscrenslider-container"
      onMouseDown={handleDragStart} // Start dragging
      onMouseMove={handleDragMove} // Handle dragging movement
      onMouseUp={handleDragEnd} // End dragging
      onTouchStart={handleDragStart} // Start dragging on touch
      onTouchMove={handleTouchMove} // Prevent page scroll on touch move
      onTouchEnd={handleDragEnd} // End dragging on touch
    >
      {/* Background image of the current slide */}
      <div
        className="lowscrenslider-image"
        style={{
          backgroundImage: `url(${films[currentIndex].BacgroudUrl})`, // Use BacgroudUrl from the API data
        }}
        onClick={() => handleClick((currentIndex + 1) % films.length)} // Change on click
        onMouseOver={() => handleMouseOver((currentIndex + 1) % films.length)} // Change on hover
      ></div>

      {/* Pagination dots */}
      <div className="lowscrenslider-mini-dots">
        {films.map((film, index) => (
          <div
            key={film.id}
            className={`mini-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Lowscrenslider;
