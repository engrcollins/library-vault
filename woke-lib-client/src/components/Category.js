import React, { useState, useEffect } from "react";
import './Form.css'
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import Button from '@material-ui/core/Button';
import { Grid,Typography, Divider, Paper } from "@material-ui/core";
import Category_topicsDataService from "../services/Category_topicsService";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
        padding: 1,
          width: '99%',
          padding: 2,
          border: 2,
        },
        topicCard: {
          display: 'flex',
          flexDirection: "column",
          minHeight: 70,
          paddingBottom: 0,
          paddingTop: 0,
          paddingRight: 0,
        },
        topic: {
          paddingBottom: 0,
          paddingTop: 0,
        },
        sub: {
          marginTop: -2,
          paddingTop: 0,
          paddingLeft: 5,
          fontSize: 12,
          color: "rgb(41, 61, 61)"
        },
        para: {
          marginTop: 4,
          paddingLeft: 5,
          marginBottom: 1,
          paddingBottom: 2,
          fontSize: 14,
          justifyContent: "left",
        },
  });

const Category = props => {

    const [category_topics, setCategory_topics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    const getCategory_topics = category => {
        Category_topicsDataService.get(category)
          .then(response => {
            setIsLoading(false);
            console.log(response.data)
            setCategory_topics(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }
    
      useEffect(() => {
        getCategory_topics(props.match.params.category);
      }, [props.match.params.category]);

      const classes = useStyles();
      console.log(category_topics)
    return(
        <div className="">
        {console.log(document.cookie)}
        <Grid container>
            <Grid item xs={12} sm={8} lg={9}  spacing={1} component={Paper}  className={classes.root}>
                {isLoading ? (<div>Data loading, please wait..
                    <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                    </div>
                ) : (
                    <div align="center">
                    <Card className={classes.topicCard}>
                    <CardContent align="center">
                        <Typography variant="h5" component="h2" className={classes.topic}>
                            {props.match.params.category}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" className={classes.sub}>
                            1000 Topics 
                        </Typography>
                    </CardContent>
                    </Card>
                        <List >                      
                            {category_topics &&
                                category_topics.map((category_topic, index) => (
                              <ListItem key={index} className={classes.para}>
                                <Link to={`/category/${category_topic.category}/${category_topic.topic_id}`}>
                                <ListItemText primary={<div ><p
                                  >
                                    {category_topic.title}
                                  </p></div>} />
                                  </Link>
                                  <Divider />
                                </ListItem>
                            ))}
                            </List>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};
export default Category;