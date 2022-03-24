import React from "react";
import Panel from "../views/Panel";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Routes = () => {
  return (
    <>
      <Router>
          <Route exact path="/" component={Panel} />
      </Router>
    </>
  );
};

export default Routes;
