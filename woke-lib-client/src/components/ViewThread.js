import React, { useState, useEffect } from "react";
import './Form.css'
import { BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import Library_topicDataService from "../services/Library_topicService";
import Cookies from "js-cookie";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Grid,Typography, Paper, makeStyles, Box } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

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

const Thread = props => {
    const [topic_details, setTopic_details] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getTopic_details = topic_id => {
        Library_topicDataService.get(topic_id)
          .then(response => {
            setIsLoading(false); 
            setTopic_details(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      useEffect(() => {
        getTopic_details(props.match.params.id);
      }, [props.match.params.id]);
      console.log(topic_details);
      
      const classes = useStyles();
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
                                        {topic_details.title}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary" className={classes.sub}>
                                        {new Date(topic_details.createdAt).toUTCString().slice(0, 30)} | Author: {topic_details.author}.
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Typography gutterBottom variant="body2" component="p" className={classes.para}>
                                {topic_details.content}
                            </Typography>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={4} lg={3}  component={Paper} className={classes.root}>
                        Related Topics
                </Grid>
            </Grid>
        </div>
    );
};
export default Thread;