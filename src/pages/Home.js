// pages/Home.js
import { Helmet } from "react-helmet"; // using Helmet for SEO

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
      <h1>Welcome to Hadden Industries</h1>
      <p>
        Hadden Industries is a leading innovator in scientific research and
        advanced technologies.
      </p>
      {/* Add more content, images, etc., as needed */}
    </main>
  );
}
