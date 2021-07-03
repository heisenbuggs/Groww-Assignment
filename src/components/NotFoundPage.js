import { Container, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";
import brand from "../assets/Groww-Logo.png";

const NotFoundPage = () => {
  return (
    <Container>
      <Grid container style={{ textAlign: "center" }}>
        <Grid item xs={3}></Grid>
        <Grid
          item
          xs={6}
          className="notFoundCard"
          style={{ marginTop: 30, textAlign: "center" }}
        >
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <img
            src={brand}
            height={130}
            width={440}
            alt="logo"
            className="logoImage"
          />
          <h4>Seems like a Messed Up URL!!</h4>
          <h5>
            Return back to <Link to="/">Home.</Link>
          </h5>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
