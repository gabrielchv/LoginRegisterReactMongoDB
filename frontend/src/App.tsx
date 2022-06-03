import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default () => (
  <>
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
    </Router>
  </>
);
