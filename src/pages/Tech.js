// src/pages/Tech.js
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaAtom,
  FaWater,
  FaSun,
  FaLeaf,
  FaFlask,
  FaWind,
  FaBatteryFull
} from "react-icons/fa"; // Importing icons
import "./Tech.css"; // CSS file

export default function Tech() {
  return (
    <div className="tech-container">
      <Helmet>
        <title>Hadden Industries - Technologies</title>
        <meta
          name="description"
          content="Explore the cutting-edge technologies developed by Hadden Industries."
        />
      </Helmet>

      <h1 className="tech-title">Technologies</h1>

      <div className="tech-grid">
        {techData.map((tech, index) => (
          <div className="tech-card" key={index}>
            <h2 className="tech-heading">
              <span className="tech-icon">{tech.icon}</span>{" "}
              {tech.title}
            </h2>
            <p className="tech-description">{tech.description}</p>
            <br />
            <p className="tech-link">
              <Link to={tech.link}>Learn more</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Technology data array with links and icons
const techData = [
  {
    title: "Algae",
    description:
      "Exploring bioengineering solutions with algae for fuel, food, and environmental applications.",
    link: "/algae",
    icon: <FaLeaf className="icon-style" />,
  },
  {
    title: "Batteries",
    description:
      "Pushing the boundaries of batteries. Smaller and more efficient.",
    link: "/batteries",
    icon: <FaBatteryFull className="icon-style" />,
  },
  {
    title: "Fusion",
    description:
      "Harnessing the power of nuclear fusion to create a sustainable energy source for the future.",
    link: "/fusion",
    icon: <FaAtom className="icon-style" />,
  },
  {
    title: "Hydrogen",
    description:
      "Advancing hydrogen energy for clean fuel applications, including transportation and industry.",
    link: "/hydrogen",
    icon: <FaWind className="icon-style" />,
  },
  {
    title: "Materials Design",
    description:
      "Pioneering new materials with enhanced properties for aerospace, medical, and industrial use.",
    link: "/materials-design",
    icon: <FaFlask className="icon-style" />,
  },
  {
    title: "Solar",
    description:
      "Innovating next-generation solar technologies to maximize efficiency and affordability.",
    link: "/solar",
    icon: <FaSun className="icon-style" />,
  },
  {
    title: "Water",
    description:
      "Developing advanced water purification and desalination techniques for global sustainability.",
    link: "/water",
    icon: <FaWater className="icon-style" />,
  },
];
