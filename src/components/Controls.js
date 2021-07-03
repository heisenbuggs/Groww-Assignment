import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Grid,
  makeStyles,
  withStyles,
  Box,
  Typography,
} from "@material-ui/core";
import "../styles/Controls.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import PropTypes from "prop-types";
import TableCard from "./TableCard";
import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";
import Favourite from "./Favourite";

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

const StyledTab = withStyles({
  wrapper: {
    textTransform: "capitalize",
  },
})(Tab);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Controls = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [firstdropdownOpen, setDropdownOpen] = useState(false);
  const [seconddropdownOpen, setsecondDropDownOpen] = useState(false);
  const [city, setCity] = useState("MUMBAI");
  const [cat, setCat] = useState("None");
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    var apiLink = `https://vast-shore-74260.herokuapp.com/banks?city=${city}`;
    fetch(apiLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log("Error fetching data : ", err);
      });
  }, []);

  const fetchapi = (val) => {
    setCity(val);
    setIsLoaded(false);
    var apiLink = `https://vast-shore-74260.herokuapp.com/banks?city=${val}`;
    fetch(apiLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log("Error fetching data : ", err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggletwo = () => setsecondDropDownOpen((prevState) => !prevState);

  if (!isLoaded) return <div>Loading....</div>;
  else
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
                <Link to="/" style={{textDecoration:"none", color: "#000"}}>
                  <StyledTab label="All Banks" {...a11yProps(0)} />
                </Link>
                <Link to="/favourites" style={{textDecoration:"none", color: "#000"}}>
                  <StyledTab label="Favourites" {...a11yProps(1)} />
                </Link>
              </Tabs>
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={6}>
                  <Dropdown
                    isOpen={firstdropdownOpen}
                    toggle={() => toggle(firstdropdownOpen)}
                  >
                    <DropdownToggle
                      caret
                      color="primary"
                      style={{ textTransform: "capitalize" }}
                    >
                      {city}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => fetchapi("MUMBAI")}>
                        Mumbai
                      </DropdownItem>
                      <DropdownItem onClick={() => fetchapi("BHOPAL")}>
                        Bhopal
                      </DropdownItem>
                      <DropdownItem onClick={() => fetchapi("INDORE")}>
                        Indore
                      </DropdownItem>
                      <DropdownItem onClick={() => fetchapi("DELHI")}>
                        Delhi
                      </DropdownItem>
                      <DropdownItem onClick={() => fetchapi("BANGALORE")}>
                        Bangalore
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Grid>
                <Grid item xs={6} style={{ display: "flex" }}>
                  <Dropdown
                    isOpen={seconddropdownOpen}
                    toggle={() => toggletwo(seconddropdownOpen)}
                  >
                    <DropdownToggle caret color="success">
                      {cat}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setCat("None")}>
                        None
                      </DropdownItem>
                      <DropdownItem onClick={() => setCat("IFSC")}>
                        IFSC
                      </DropdownItem>
                      <DropdownItem onClick={() => setCat("Bank Name")}>
                        Bank Name
                      </DropdownItem>
                      <DropdownItem onClick={() => setCat("Bank ID")}>
                        Bank ID
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <TableCard data={data} />
      </div>
    );
};

export default Controls;
