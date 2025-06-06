// src/pages/Tech.js
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaAtom,
  FaWater,
  FaSun,
  FaLeaf,
  FaFlask,
  FaWind,
  FaBatteryFull,
} from "react-icons/fa"; // Importing icons
import "../index.css"; // Global styles
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

      <h1>Technologies</h1>

      <div className="tech-grid">
        {techData.map((tech, index) => (
          <div className="tech-card" key={index}>
            <h2 className="tech-heading">
              <span className="tech-icon">{tech.icon}</span> {tech.title}
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
    description: "Bioengineering algae for fuel and food.",
    link: "/products#algae",
    icon: <FaLeaf className="icon-style" />,
  },
  {
    title: "Batteries",
    description: "Efficient batteries.",
    link: "/products#batteries",
    icon: <FaBatteryFull className="icon-style" />,
  },
  {
    title: "Fusion",
    description: "Clean nuclear fusion energy.",
    link: "/products#fusion",
    icon: <FaAtom className="icon-style" />,
  },
  {
    title: "Hydrogen",
    description: "Advancing hydrogen energy.",
    link: "/products#hydrogen",
    icon: <FaWind className="icon-style" />,
  },
  {
    title: "Materials Design",
    description: "Innovative materials.",
    link: "/products#materials-design",
    icon: <FaFlask className="icon-style" />,
  },
  {
    title: "Solar",
    description: "Next generation solar power.",
    link: "/products#solar",
    icon: <FaSun className="icon-style" />,
  },
  {
    title: "Water",
    description: "Advanced water purification.",
    link: "/products#water",
    icon: <FaWater className="icon-style" />,
  },
];
