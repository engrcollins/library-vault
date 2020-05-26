import React, {component, useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import LayersIcon from '@material-ui/icons/Layers';
//import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header';
import ArchiveNav from './Navigation';
import Profile from './components/Profile';
import Side from './SideNav.js';
import "./App.css";
import Home from "./Home";
import Registration from "./components/Register";
import Login from "./components/Login";
import AddThread from "./components/AddThread";
import Footer from "./Footer.js";
import Category from "./components/Category";
import Thread from "./components/ViewThread";

function App() {

  return (
      <div id="appContainer" >
      <Router>
        <Header />
          <ArchiveNav />
                <Grid container spacing={3} >
                <Grid item xs={12} sm={3} lg={2}>
                  <Side />
                </Grid>
                  <br/>
                  <br/>
                  <Grid item xs={12} sm={9} lg={10}>
                  <div className="appContent" style={{textAlign: "center"}}>
                  <Switch>
                      <Route path="/join-library" component={Registration} />
                      <Route path="/login" component={Login} />
                      <Route path="/profile/:username" component={Profile} />
                      <Route path="/category/:category/:id" component={Thread} />
                      <Route path="/category/:category" component={Category} />
                      <Route path="/add-new-thread" component={AddThread} />
                      <Route path="/" component={Home} />
                    </Switch>
                </div>
                </Grid>
                </Grid>
                <br/>
            <div>
              <Footer />
            </div>
            </Router>
          </div>
  );
}

export default App;
