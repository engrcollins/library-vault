import React, { useState, useEffect } from "react";
import './CustomersList.css'
import CustomerDataService from "../services/Library_userService";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minWidth: 410,
    border: 1,
  },
  table: {
    minWidth: 360,
  },
  active: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
});

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(1)

  useEffect(() => {
    retrieveCustomers();
  }, []);

  const retrieveCustomers = () => {
    CustomerDataService.getAll()
      .then(response => {
        setIsLoading(false);
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const refreshList = () => {
    retrieveCustomers();
    setCurrentCustomer(null);
    setCurrentIndex(-1);
  };

  const setActiveCustomer = (customer, index) => {
    setCurrentCustomer(customer);
    setCurrentIndex(index);
  };

  const newLocation = (external) => {
    window.open(external)
  }

  const classes = useStyles();

  return (
    <div className="">
      <Grid container spacing={3} >
      <Grid item xs={12} sm={7} className="appContent">
        <div className="customer-details" id="section1">
        {currentCustomer ? (
          <div>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center"><strong>ARTICLE &nbsp;
                          {currentCustomer.id}</strong>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
            <TableRow>
              <TableCell align="left"><strong>Title:</strong></TableCell>
              <TableCell align="left">{" "}
              {currentCustomer.title}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left"><strong>Category:</strong></TableCell>
              <TableCell align="left">{" "}
              {currentCustomer.category}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left"><strong>Description:</strong></TableCell>
              <TableCell align="left">{" "}
              {currentCustomer.description}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left"><strong>Source:</strong></TableCell>
              <TableCell align="left">{" "}
              {currentCustomer.source}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left"><strong>Author:</strong></TableCell>
              <TableCell align="left">{" "}
              {currentCustomer.author}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left"><strong>URL:</strong></TableCell>
              <TableCell align="left"><a  href={currentCustomer.URL} target="_blank">{" "} {currentCustomer.URL}</a>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left"><strong>Tags:</strong></TableCell>
              <TableCell align="left">{" "}
              {currentCustomer.tags}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left"><strong>Status:</strong></TableCell>
              <TableCell align="left">{" "}
              {currentCustomer.published ? "Published" : "Pending"}</TableCell>
            </TableRow>
            </TableBody>
            </Table>
              <Link to={"/customers/" + currentCustomer.id}
                >
                  Edit
              </Link>
          </TableContainer>
        </div>
            ) : (
              <div>
                <br/>
                <br/>
                <p>No article selected</p>
              </div>
        )}
      </div>
      </Grid>
      <Grid item xs={12} sm={5} className="appContent">
      {isLoading ? (<p>Data loading, please wait.. 
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
       </p>) : (
        <div className="article-list" className={classes.root}>
          <h3><strong>ARTICLE TOPICS</strong></h3>
          <p>Click on any article below to view details...</p>
          <div >
          <List component="nav" >
          {customers &&
              customers.map((customer, index) => (
                <ListItem button key={index}
                   selected={currentIndex === index}
                    onClick={() => setActiveCustomer(customer, index)}
                    >
                  <AnchorLink href='#section1'>
                  <ListItemText primary={<div ><p
                    >
                      {customer.title}
                    </p></div>} />
                    </AnchorLink>
                    <Divider />
                  </ListItem>
              ))}
              </List>
              </div>
            </div>
       )}
      </Grid>
      </Grid>
      </div>
  );
}

export default CustomersList;
