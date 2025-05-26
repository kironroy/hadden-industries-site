import React, { useState, useEffect } from "react";
import "./BackToTop.css"; // Add styling in a separate CSS file

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300); // Show button when scrolled down 300px
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll
  };

  return (
    <button
      className={`back-to-top ${visible ? "show" : "hide"}`}
      onClick={scrollToTop}
    >
      Back to Top
    </button>
  );
};

export default BackToTop;
