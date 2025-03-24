import React, { useState } from "react";
import './VideoPlayer.css'; // Optional for styles

const VideoPlayer = ({ videoUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`video-container ${isExpanded ? "expanded" : ""}`}
      style={{ maxWidth: isExpanded ? "100%" : "1000px", transition: "all 0.3s ease" }}
    >
      <video
        className="video-player"
        src={videoUrl}
        controls
        controlsList="nodownload"  // ✅ Download ღილაკი გამორთულია
        disablePictureInPicture  // ✅ გამორთავს PiP ფუნქციას
        width="100%"
        height="auto"
      >
        Your browser does not support the video tag.
      </video>

      <button onClick={toggleSize} className="expand-button">
        {isExpanded ? "Shrink" : "Expand"}
      </button>
    </div>
  );
};

export default VideoPlayer;
