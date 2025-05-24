// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // CSS for styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Hadden Industries</div>
      <ul className="nav-links">
        <li>
          <Link to="/tech">Technologies</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/research">Research</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
