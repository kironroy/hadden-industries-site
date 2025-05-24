// src/pages/Tech.js
import React from "react";
import { Helmet } from "react-helmet";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";

export default function Tech() {
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Hadden Industries - Technologies</title>
        <meta
          name="description"
          content="Explore the cutting-edge technologies developed by Hadden Industries."
        />
      </Helmet>

      <Typography variant="h2" align="center" gutterBottom>
        Technologies
      </Typography>

      <Grid container spacing={3}>
        {techData.map((tech, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {tech.title}
                </Typography>
                <Typography variant="body2">{tech.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// Technology data array
const techData = [
  {
    title: "Fusion",
    description:
      "Harnessing the power of nuclear fusion to create a sustainable energy source for the future.",
  },
  {
    title: "Hydrogen",
    description:
      "Advancing hydrogen energy for clean fuel applications, including transportation and industry.",
  },
  {
    title: "Solar",
    description:
      "Innovating next-generation solar technologies to maximize efficiency and affordability.",
  },
  {
    title: "Water",
    description:
      "Developing advanced water purification and desalination techniques for global sustainability.",
  },
  {
    title: "Algae",
    description:
      "Exploring bioengineering solutions with algae for fuel, food, and environmental applications.",
  },
  {
    title: "Materials Design",
    description:
      "Pioneering new materials with enhanced properties for aerospace, medical, and industrial use.",
  },
];
