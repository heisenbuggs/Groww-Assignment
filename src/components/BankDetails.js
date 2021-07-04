import { Container, Grid } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Controls.css";

const BankDetails = (props) => {
  console.log(props);
  const location = useLocation();
  const { row } = location.state;

  return (
    <Container>
      <Grid
        item
        xs={12}
        className="controlsCard"
        style={{ marginTop: 30, textAlign: "center" }}
      >
        <div className="heading">
          <h4>{row.bank_name}</h4>
        </div>
      </Grid>
      <Grid container style={{ textAlign: "center" }}>
        <Grid item xs={3}></Grid>
        <Grid
          item
          xs={6}
          className="controlsCard"
          style={{ marginTop: 30, textAlign: "center" }}
        >
          <p style={{ textAlign: "left", marginLeft: 10, marginTop: 20 }}>
            <p>
              <b>Bank ID : </b>
              {`${row.bank_id}\n`}
            </p>
            <p>
              <b>Bank Name : </b>
              {`${row.bank_name}`}
            </p>
            <p>
              <b>Branch : </b>
              {`${row.branch}`}
            </p>
            <p>
              <b>IFSC : </b>
              {`${row.ifsc}`}
            </p>
            <p>
              <b>Address : </b>
              {`${row.address}`}
            </p>
            <p>
              <b>City : </b>
              {`${row.city}`}
            </p>
            <p>
              <b>District : </b>
              {`${row.district}`}
            </p>
            <p>
              <b>State : </b>
              {`${row.state}`}
            </p>
          </p>
          <h6>
            Return Back to <Link to="/all-banks">Home</Link>
          </h6>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BankDetails;
