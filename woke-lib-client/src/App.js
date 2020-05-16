import React, {component, useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import LayersIcon from '@material-ui/icons/Layers';
//import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header';
import ArchiveNav from './Navigation';
import Side from './SideNav.js';
import "./App.css";
import Home from "./Home";
import Registration from "./components/Register";
//import AddCustomer from "./components/AddCustomer";
import AddThread from "./components/AddThread";
//import Customer from "./components/Customer";
//import CustomersList from "./components/CustomersList";
import Footer from "./Footer.js";

function App() {

  return (
      <div id="appContainer" >
      <Header />
        <ArchiveNav />
            <Router>
              <Grid container spacing={3} component={Paper} >
              <Grid item xs={12} sm={3} lg={2}>
                <Side />
              </Grid>
                <br/>
                <br/>
                <Grid item xs={9} sm={9} lg={10}>
                <div className="appContent" style={{textAlign: "center"}}>
                <Switch>
                    <Route path="/join-library" component={Registration} />
                    {/*<Route path="/add" component={AddCustomer} />*/}
                    <Route path="/add-new-thread" component={AddThread} />
                    {/*<Route path="/customers/:id" component={Customer} />*/}
                    {/*<Route path="/customers" component={CustomersList} />*/}
                    <Route path="/" component={Home} />
                  </Switch>
              </div>
              </Grid>
              </Grid>
          </Router>
          <div>
            <Footer />
          </div>
          </div>
  );
}

export default App;
