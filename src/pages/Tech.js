// src/pages/Tech.js
import React from "react";
import { Helmet } from "react-helmet";

export default function Tech() {
  return (
    <main>
      <Helmet>
        <title>Hadden Industries - Technologies</title>
        <meta
          name="description"
          content="Explore the cutting-edge technologies developed by Hadden Industries."
        />
      </Helmet>
      <h1>Technologies</h1>
      <section>
        <h2>Fusion</h2>
        <p>
          Harnessing the power of nuclear fusion to create a sustainable energy
          source for the future.
        </p>
      </section>
      <section>
        <h2>Hydrogen</h2>
        <p>
          Advancing hydrogen energy for clean fuel applications, including
          transportation and industry.
        </p>
      </section>
      <section>
        <h2>Solar</h2>
        <p>
          Innovating next-generation solar technologies to maximize efficiency
          and affordability.
        </p>
      </section>
      <section>
        <h2>Water</h2>
        <p>
          Developing advanced water purification and desalination techniques for
          global sustainability.
        </p>
      </section>
      <section>
        <h2>Algae</h2>
        <p>
          Exploring bioengineering solutions with algae for fuel, food, and
          environmental applications.
        </p>
      </section>
      <section>
        <h2>Materials Design</h2>
        <p>
          Pioneering new materials with enhanced properties for aerospace,
          medical, and industrial use.
        </p>
      </section>
    </main>
  );
}
