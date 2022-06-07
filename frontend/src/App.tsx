import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default () => (
  <>
    <Navbar/>
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
    </Router>
    <Footer/>
  </>
);
