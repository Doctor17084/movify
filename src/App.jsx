import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Actor from "./pages/Actor";
import Live from "./pages/Live";
import Movie from "./pages/Movies";
import Serial from "./pages/Serial";
import Dashboard from "./componenets/Dashbord"; // Fixed typo in import
import Header from "./componenets/Header"; // Fixed typo in import
import ProtectedRoute from "./componenets/ProtectedRoute"; // Fixed typo in import
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Movfilms from "./componenets/Movfilms";
import Adminpanel from "./componenets/autorithation/Adminpanel"; // ✅ Admin Panel კომპონენტი
import Laptopscrenncomponenet from "./componenets/Laptopscrenncomponenet"; // Corrected name

function App() {
  return (
    <AuthProvider>
     <h1 style={{ color: "white", fontSize: "15px", textAlign: "center" }} className="scrolling-text">
  საიტი მუშაობს სატესტო რეჟიმში, ფილმები მალე დაემატება და განახლდება
</h1>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actor" element={<Actor />} />
          <Route path="/live" element={<Live />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/serial" element={<Serial />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* 🎬 Dynamic movie ID route */}
          <Route path="/movie/:id" element={<Movfilms />} />

          {/* 🔐 Admin Panel Route (Only for Admins) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <Adminpanel />
              </ProtectedRoute>
            }
          />
          {/* Updated route with corrected path */}
          <Route path="/Laptopscrenncomponenet" element={<Laptopscrenncomponenet/>} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
