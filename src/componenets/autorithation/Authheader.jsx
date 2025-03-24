import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ეს დაამატე
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userimg from "../../assets/sss.svg";
import AuthContext from "../../context/AuthContext";
import AuthOverlay from "../AuthOverlay";

function Authheader() {
  const { user, logout } = useContext(AuthContext);
  const [isAuthOverlayOpen, setAuthOverlayOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ✅ ეს ჩასვი ნავიგაციისთვის

  const toggleAuthOverlay = () => {
    if (!user) {
      setAuthOverlayOpen(true);
    }
  };

  const toggleDropdown = () => {
    if (user) {
      setIsDropdownOpen(prevState => !prevState);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (user && !localStorage.getItem("hasLoggedIn")) {
      toast.success("✅ წარმატებით გაიარეთ ავტორიზაცია!", {
        position: "bottom-right",
        autoClose: 5000,
      });
      localStorage.setItem("hasLoggedIn", "true");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("hasLoggedIn");
    toast.info("🚪 თქვენ დატოვეთ პროფილი.", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };

  const goToAdminPanel = () => {
    navigate("/admin"); // ✅ ადმინისტრატორის პანელზე გადართვა
  };

  return (
    <div className="user-profile" ref={dropdownRef}>
      <div className="user_circle" onClick={user ? toggleDropdown : toggleAuthOverlay}>
        <img src={userimg} alt="User" />
      </div>

      {!user && isAuthOverlayOpen && (
        <AuthOverlay onClose={() => setAuthOverlayOpen(false)} />
      )}

      {user && isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">პროფაილი</div>
          <div className="dropdown-item">ბალანსი: 0₾</div>
          <div className="dropdown-item">პარამეტრები</div>

          {user.role === "Admin" && (
            <div className="dropdown-item" onClick={goToAdminPanel}>⚡ ადმინის პანელი</div>
          )}

          <div className="dropdown-item" onClick={handleLogout}>
            გასვლა
          </div>
        </div>
      )}
    </div>
  );
}

export default Authheader;
