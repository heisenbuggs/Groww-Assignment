import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { CallMade, Favorite, FavoriteBorder } from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";
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

const TableCard = ({ data, category }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const originalRows = data;
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

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

  return (
    <div className="tableCard">
      <Paper className={classes.root}>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
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
                            {column.id === "favourite" && (
                              <div>
                                <FavoriteBorder />
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
