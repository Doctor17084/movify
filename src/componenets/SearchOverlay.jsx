import React, { useState } from "react";
import axios from "axios";

export default function SearchOverlay({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true); // მოლოდინში
    try {
      const response = await axios.get(`http://localhost:5000/api/movies?query=${query}`);
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };

  return (
    <div className="expanded-search">
      <div className="input_conteiner">
        <span className="close" onClick={onClose}>X</span>
        <input
          className="SearchExpanded"
          type="text"
          placeholder="მოძებნე ფილმები..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="search-results">
        {loading ? (
          <p>მოთხოვნა მიმდინარეობს...</p>
        ) : (
          searchQuery && (
            searchResults.length > 0 ? (
              searchResults.map((movie) => (
                <div key={movie.id} className="movie-item">
                  {movie.title}
                </div>
              ))
            ) : (
              <p className="no-results">ასეთი ფილმი არ მოიძებნა</p>
            )
          )
        )}
      </div>
    </div>
  );
}
