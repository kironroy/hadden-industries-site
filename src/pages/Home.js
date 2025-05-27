// pages/Home.js
import { Helmet } from "react-helmet"; // using Helmet for SEO
import "./Home.css";

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Hadden Industries - Home</title>
        <meta
          name="description"
          content="Welcome to Hadden Industries. Innovating in science and technology."
        />
      </Helmet>
      <h1>About</h1>
      <img src={require("../assets/sr-hadden.jpg")} alt="S.R. Hadden" />
    
      
      <p className="about">
        Hadden Industries is a leading innovator in scientific research and
        advanced technologies.
      </p>
      <p className="about">
        S. R. Hadden saw what others missed. The world needed clean water,
        power, and materials that lasted. He made them.
      </p>
      <p className="about">
        Water wasn’t a resource—it was life. He built machines turned waste into
        something drinkable. Where others saw problems, he saw solutions.
      </p>
      <p className="about">
        The sun gave endless power, and he harnessed it. Besides solar panels,
        he created new materials—thin, light, indestructible materials. He built
        what the future needed before the future arrived.
      </p>
      <p className="about">
        Hydrogen drove the engines; fusion lit the skies. He knew fossil fuels
        were relics, so he made them obsolete. Cities ran on his ideas. The
        world moved because of him.
      </p>
      <p className="about">
        Algae, simple and overlooked, became his secret weapon. It fed nations,
        fueled machines, healed the air. He saw its potential before anyone
        else.
      </p>
      <p className="about">
        Hadden didn’t live in the present—he built for what came next. And when
        the world caught up, he was already gone, watching from beyond.
      </p>
    </main>
  );
}
