import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Meniu from "../componenets/Meniu";
import login from "../assets/Login.png";
import Reserch from "../assets/Reserch.png";
import SearchBox from "../componenets/SearchBox";
import SearchOverlay from "../componenets/SearchOverlay";
import AuthOverlay from "../componenets/AuthOverlay";
import  AuthContext from "../context/AuthContext"; // Correctly import AuthContext
import Authheader from "./autorithation/Authheader";
import  './Stylecomponents.css'

export default function Header() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [authExpanded, setAuthExpanded] = useState(false);
  const { user, logout } = useContext(AuthContext); // Access context here

  return (
    <div className="header">
      <div className="logo">
        <Link to="/"> <h1>
      <span className="movi">Movi</span>
      <span className="fyge">fy.ge</span>
    </h1></Link>
      </div>
      <div className="menu"><Meniu /></div>
      <div className="searchs">
        <SearchBox
          type="text"
          placeholder="ძებნა..."
          readOnly
          onClick={() => setSearchExpanded(true)}
        />
        <img
          className="searchimg"
          src={Reserch}
          alt="search"
          onClick={() => setSearchExpanded(true)}
        />
      </div>
      <div className="login">
      <Authheader />
        {user ? (
          <button className="button_1" onClick={logout}> {/* Show logout button */}
            <div className="buttonss">გამოსვლა</div>
            <div className="button_img"><img src={login} alt="login" /></div>
          </button>
        ) : (
          <button className="button_1" onClick={() => setAuthExpanded(true)}> {/* Open auth overlay */}
            <div className="buttonss">ავტორიზაცია</div>
            <div className="button_img"><img src={login} alt="login" /></div>
          </button>
        )}
      </div>

      {/* Show search overlay when expanded */}
      {searchExpanded && <SearchOverlay onClose={() => setSearchExpanded(false)} />}

      {/* Show auth overlay when expanded */}
      {authExpanded && <AuthOverlay onClose={() => setAuthExpanded(false)} />}
    </div>
  );
}
