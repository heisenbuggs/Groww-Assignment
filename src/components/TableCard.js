import {
  makeStyles,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { CallMade, Favorite, FavoriteBorder } from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/TableCard.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "auto",
  },
});

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

const TableCard = ({ data, category, val }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  var originalRows = data;
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");
  const [opensuccess, setOpenSuccess] = useState(false);
  const [openinfo, setOpeninfo] = useState(false);
  var vertical="bottom", horizontal="right";

  const handleClick = () => {
    setOpenSuccess(true);
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchVal) => {
    const filteredRows = originalRows.filter((row) => {
      if (category !== "")
        return row[category].toLowerCase().includes(searchVal.toLowerCase());
      else return !null;
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const favClick = (id) => {
    originalRows.forEach((row) => {
      if (row.ifsc === id) {
        row.favourite = !row.favourite;
      }
    });
    const item = JSON.parse(localStorage.getItem(val));
    const newItem = {
      data: originalRows,
      expiry: item.expiry,
    };
    const data = originalRows.find((row) => row.ifsc === id);
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
    <div className="tableCard">
      <Paper className={classes.root}>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          className="searchbar"
        />
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
              {rows
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
                          <StyledTableCell key={column.id} align={column.align}>
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
                              <div
                                onClick={() => {
                                  favClick(row.ifsc);
                                  handleClick();
                                }}
                              >
                                <FavoriteBorder />
                              </div>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TableCard;
