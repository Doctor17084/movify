import React from "react";
import "./pages.css"; // თუ ამ ფაილში იქნებოდა CSS

const MaintenanceMessage = () => {
  return (
    <div className="axalikontaineri">
    <h1 className="maintenance-message">
      საიტი არის მზადების პროცესში და მალე განახლდება
      <span className="do"><h1>.♥</h1></span>
      <span className="do"><h1>.♥</h1></span>
      <span className="do"><h1>.♥</h1></span>
    </h1>

    </div>
  );
};

export default MaintenanceMessage;
