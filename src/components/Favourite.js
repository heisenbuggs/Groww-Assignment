import {
  Grid,
  makeStyles,
  Tabs,
  withStyles,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { CallMade, Favorite, FavoriteBorder } from "@material-ui/icons";
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

const columns = [
  { id: "bank_id", label: "Bank ID", minWidth: 100 },
  { id: "bank_name", label: "Bank Name", minWidth: 150 },
  { id: "branch", label: "Branch", minWidth: 100 },
  {
    id: "address",
    label: "Address",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "city",
    label: "City",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ifsc",
    label: "IFSC",
    minWidth: 150,
    align: "center",
  },
  {
    id: "favourite",
    label: "Favourite",
    align: "right",
    minWidth: 50,
  },
];

const StyledTab = withStyles({
  wrapper: {
    textTransform: "capitalize",
  },
})(Tab);

const Favourite = () => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  var originalRows = JSON.parse(localStorage.getItem("favourite"));
  const [rows, setRows] = useState(originalRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const favClick = (id) => {
    originalRows.map((row) => {
      if (row.ifsc === id) {
        row.favourite = !row.favourite;
      }
    });
    const data = originalRows.find((row) => row.ifsc === id);
    var val = data.city;
    const item = JSON.parse(localStorage.getItem(val));
    const newItem = {
      data: originalRows,
      expiry: item.expiry,
    };
    var oldFav = JSON.parse(localStorage.getItem("favourite"));
    // if data is present in oldfav then remove it else push it and update the localstorage of favourite
    var flag = true;
    var newFav = [];
    oldFav.map((row) => {
      if (row.ifsc !== data.ifsc) {
        newFav.push(row);
      } else flag = false;
    });
    if (flag) newFav.push(data);
    localStorage.setItem("favourite", JSON.stringify(newFav));
    localStorage.setItem(val, JSON.stringify(newItem));
    setRows(originalRows);
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
      <div className="controlsCard">
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && column.id !== "bank_name"
                              ? column.format(value)
                              : value}
                            {column.id === "bank_name" && (
                              <Link
                                to={{
                                  pathname: `/bank-details/${row["ifsc"]}`,
                                  state: { row: row },
                                }}
                              >
                                <CallMade />
                              </Link>
                            )}
                            {column.id === "favourite" && !row.favourite && (
                              <div onClick={() => favClick(row.ifsc)}>
                                <FavoriteBorder />
                              </div>
                            )}
                            {column.id === "favourite" && row.favourite && (
                              <div onClick={() => favClick(row.ifsc)}>
                                {console.log(row.favourite)}
                                <Favorite style={{ color: "#43CF99" }} />
                              </div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Favourite;
