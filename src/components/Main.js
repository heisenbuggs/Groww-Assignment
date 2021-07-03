import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import BankDetails from "./BankDetails";
import Controls from "./Controls";
import Favourite from "./Favourite";
import NotFoundPage from "./NotFoundPage";

const Main = () => {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/all-banks" />
          </Route>
          <Route path="/all-banks" exact>
            <Controls />
          </Route>
          <Route path="/bank-details/:id">
            <BankDetails />
          </Route>
          <Route path="/favourites">
            <Favourite />
          </Route>
          <Route component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default Main;
