import React from "react";
import { Link } from "react-router-dom";
import "./Stylecomponents.css";
import Home from "../assets/Home.png";
import Documentary from "../assets/Documentary.png";
import popcorn from "../assets/popcorn.png";
import Actor from "../assets/Actor.png";
import RFIDSignal from "../assets/RFIDSignal.png";
import "./Media.css";

function Meniu({ closeAuth }) {
  const menuItems = [
    { to: "/", src: Home, label: "მთავარი" },
    { to: "/movie", src: Documentary, label: "ფილმები" },
    { to: "/serial", src: popcorn, label: "სერიალები" },
    { to: "/actor", src: Actor, label: "მსახიობები" },
    { to: "/live", src: RFIDSignal, label: "ლაივი" },
  ];

  return (
    <div className="Menu-item">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="menu-icon">
              <Link to={item.to} onClick={() => closeAuth()}>
                <img src={item.src} alt={item.label} />
              </Link>
              <Link to={item.to} onClick={() => closeAuth()}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Meniu;
