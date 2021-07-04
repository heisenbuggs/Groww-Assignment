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
  TablePagination,
  Snackbar,
} from "@material-ui/core";
import {
  CallMade,
  Favorite,
  FavoriteBorderOutlined,
  List,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#14A37F",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Favourite = () => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  var originalRows = JSON.parse(localStorage.getItem("favourite"));
  const [rows, setRows] = useState(originalRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [opensuccess, setOpenSuccess] = useState(false);
  const [openinfo, setOpeninfo] = useState(false);
  var vertical = "bottom",
    horizontal = "right";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccess(false);
  };

  const handleClickInfo = () => {
    setOpeninfo(true);
  };

  const handleCloseInfo = (event, reason) => {
    if (reason === "clickaway") return;
    setOpeninfo(false);
  };

  useEffect(() => {
    if (localStorage.getItem("favourite") === null) {
      localStorage.setItem("favourite", JSON.stringify([]));
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const favClick = (id) => {
    originalRows.forEach((row) => {
      if (row.ifsc === id) {
        row.favourite = !row.favourite;
      }
    });
    const data = originalRows.find((row) => row.ifsc === id);
    var val = data.city;
    var item = JSON.parse(localStorage.getItem(val));

    item.data.forEach((row) => {
      if (row.ifsc === id) {
        row.favourite = !row.favourite;
      }
    });

    const newItem = {
      data: item.data,
      expiry: item.expiry,
    };
    var oldFav = JSON.parse(localStorage.getItem("favourite"));
    // if data is present in oldfav then remove it else push it and update the localstorage of favourite
    var flag = true;
    var newFav = [];
    oldFav.forEach((row) => {
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
                <StyledTab
                  label="All Banks"
                  icon={<List />}
                  {...a11yProps(0)}
                />
              </Link>
              <Link
                to="/favourites"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <StyledTab
                  label="Favourites"
                  icon={<FavoriteBorderOutlined />}
                  {...a11yProps(1)}
                />
              </Link>
            </Tabs>
          </Grid>
        </Grid>
      </div>
      <div className="controlsCard">
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <b>{column.label}</b>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
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
                              {column.id === "favourite" && row.favourite && (
                                <div
                                  onClick={() => {
                                    favClick(row.ifsc);
                                    handleClickInfo();
                                  }}
                                >
                                  <Favorite style={{ color: "#43CF99" }} />
                                </div>
                              )}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    );
                  })}
              <Snackbar
                open={opensuccess}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
              >
                <Alert onClose={handleClose} severity="success">
                  Bank Added to Favourites!!
                </Alert>
              </Snackbar>
              <Snackbar
                open={openinfo}
                autoHideDuration={2000}
                onClose={handleCloseInfo}
                anchorOrigin={{ vertical, horizontal }}
              >
                <Alert onClose={handleCloseInfo} severity="info">
                  Bank Removed from Favourites!!
                </Alert>
              </Snackbar>
            </TableBody>
          </Table>
        </TableContainer>
        {rows && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
        {!rows && (
          <h6 style={{ textAlign: "center" }}>No Favourites Available!!</h6>
        )}
      </div>
    </div>
  );
};

export default Favourite;
