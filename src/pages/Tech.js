// src/pages/Tech.js
import { Helmet } from "react-helmet";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Tech() {
  return (
    <Container
      maxWidth="md"
      sx={{
        padding: 2,
        backgroundColor: "#f5f5f5", // Slightly darker than white for subtle contrast
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>Hadden Industries - Technologies</title>
        <meta
          name="description"
          content="Explore the cutting-edge technologies developed by Hadden Industries."
        />
      </Helmet>

      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          color: "#212121", // Dark gray for H1
          fontWeight: 700,
          fontSize: { xs: "1.8rem", sm: "2.5rem" },
        }}
      >
        Technologies
      </Typography>

      <Grid container spacing={6}>
        {" "}
        {/* Increased spacing between cards */}
        {techData.map((tech, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={1}
              sx={{ minHeight: "100%", padding: 2, backgroundColor: "#fff" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#424242", fontWeight: 600 }} // Darker gray for H2
                >
                  {tech.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    color: "#3E3E3E",
                  }} // Darker gray for body text
                >
                  {tech.description}
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.2rem", fontWeight: 500 }}
                >
                  <Link to={tech.link} style={{ textDecoration: "none" }}>
                    <strong>&gt;&gt; Learn more</strong>
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// Technology data array with links
const techData = [
  {
    title: "Fusion",
    description:
      "Harnessing the power of nuclear fusion to create a sustainable energy source for the future.",
    link: "/fusion",
  },
  {
    title: "Hydrogen",
    description:
      "Advancing hydrogen energy for clean fuel applications, including transportation and industry.",
    link: "/hydrogen",
  },
  {
    title: "Solar",
    description:
      "Innovating next-generation solar technologies to maximize efficiency and affordability.",
    link: "/solar",
  },
  {
    title: "Water",
    description:
      "Developing advanced water purification and desalination techniques for global sustainability.",
    link: "/water",
  },
  {
    title: "Algae",
    description:
      "Exploring bioengineering solutions with algae for fuel, food, and environmental applications.",
    link: "/algae",
  },
  {
    title: "Materials Design",
    description:
      "Pioneering new materials with enhanced properties for aerospace, medical, and industrial use.",
    link: "/materials-design",
  },
];
