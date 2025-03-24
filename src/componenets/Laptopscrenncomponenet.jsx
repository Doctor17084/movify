import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Stylecomponents.css";
import Reserch from "../assets/Reserch.png";
import Authheader from "./autorithation/Authheader";
import AuthContext from "../context/AuthContext";
import login from "../assets/login.png";
import Home from "../assets/Home.png";
import Documentary from "../assets/Documentary.png";
import popcorn from "../assets/popcorn.png";
import Actor from "../assets/Actor.png";
import RFIDSignal from "../assets/RFIDSignal.png";
import Lowscrenslider from "./Lowscrenslider";

function Laptopscrenncomponenet() {
  const menuItems = [
    { to: "/", src: Home, label: "მთავარი" },
    { to: "/movie", src: Documentary, label: "ფილმები" },
    { to: "/serial", src: popcorn, label: "სერიალები" },
    { to: "/actor", src: Actor, label: "მსახიობები" },
    { to: "/live", src: RFIDSignal, label: "ლაივი" },
  ];

  const { user, logout } = useContext(AuthContext);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="two-menucontainer">
      <div className="first-menu">
        <div className="searchs">
          <img
            className="searchimgs"
            src={Reserch}
            alt="search"
            onClick={() => setSearchExpanded(true)}
          />
        </div>
        <div className="logo">
          <Link to="/">
            <h1>
              <span className="movi">Movi</span>
              <span className="fyge">fy.ge</span>
            </h1>
          </Link>
        </div>
        <div className="login">
          <Authheader />
          {user ? (
            <button className="button_1" onClick={logout}>
              <div className="buttonss">გამოსვლა</div>
              <div className="button_img">
                <img src={login} alt="login" />
              </div>
            </button>
          ) : (
            <button
              className="button_1"
              onClick={() => setSearchExpanded(true)}
            >
              <div className="buttonss">ავტორიზაცია</div>
              <div className="button_img">
                <img src={login} alt="login" />
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="two-menu">
      <button
    className="p-2 focus:outline-none"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <X size={30} color="#ff5733" /> : <Menu size={30} color="#ff5733" />}
  </button>
        {menuOpen && (
          <div className="Menu-it">
            <nav>
              <ul className="flex flex-col p-2">
                {menuItems.map((item, index) => (
                  <li key={index} className="menu-icon p-2 hover:bg-gray-100">
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-6 h-6"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
      <Lowscrenslider />
    </div>
  );
}

export default Laptopscrenncomponenet;
