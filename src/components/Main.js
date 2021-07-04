import { Container } from "@material-ui/core";
import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import BankDetails from "./BankDetails";
import Controls from "./Controls";
import Favourite from "./Favourite";
import NotFoundPage from "./NotFoundPage";

const Main = () => {
  return (
    <Container>
      <HashRouter>
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
      </HashRouter>
    </Container>
  );
};

export default Main;
