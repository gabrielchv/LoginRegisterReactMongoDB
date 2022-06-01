import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import "./style/login.css"  

export default () => (
  <>
    <Router>
      <Route path="/login" component={Login} />
    </Router>
  </>
);
