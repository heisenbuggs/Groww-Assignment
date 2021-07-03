import { Grid, makeStyles, Tabs, withStyles, Tab } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: 20,
  },
  indicator: {
    backgroundColor: "#597AFB",
  },
  cont: {
    justifyContent: "space-between",
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTab = withStyles({
  wrapper: {
    textTransform: "capitalize",
  },
})(Tab);

const Favourite = () => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="controlsCard">
        <Grid container className={classes.cont}>
          <Grid item xs={6} md={4}>
            <Tabs
              value={value}
              onChange={handleChange}
              classes={{ indicator: classes.indicator }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
                <StyledTab label="All Banks" {...a11yProps(0)} />
              </Link>
              <Link
                to="/favourites"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <StyledTab label="Favourites" {...a11yProps(1)} />
              </Link>
            </Tabs>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Favourite;
