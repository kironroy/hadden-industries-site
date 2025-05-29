// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../assets/hadden.svg"; // Make sure your SVG is in src/assets/
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false); // Close menu when a link is clicked
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" onClick={handleLinkClick} className="logo-link">
          <LogoIcon className="logo-icon" /> {/* SVG Icon */}
          <h1 className="logo">Hadden</h1>
        </Link>
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/tech" onClick={handleLinkClick}>
            Technologies
          </Link>
        </li>
        <li>
          <Link to="/products" onClick={handleLinkClick}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/research" onClick={handleLinkClick}>
            Research
          </Link>
        </li>
        <li>
          <Link to="/locations" onClick={handleLinkClick}>
            Locations
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleLinkClick}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
