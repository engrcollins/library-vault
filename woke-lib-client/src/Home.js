import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import './Home.css'
import Library_topicDataService from "./services/Library_topicService";
import { Grid,Typography, Paper, Divider, makeStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const useStyles = makeStyles({
  root: {
    padding: 1,
      width: '100%',
      padding: 2,
      border: 2,
    },
  topic: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 1,
  },
  sub: {
    marginLeft: 35,
    marginTop: -2,
    paddingTop: 0,
    paddingLeft: 5,
    fontSize: 12,
    color: "rgb(41, 61, 61)"
  },
  para: {
    marginLeft: 30,
    marginTop: 4,
    paddingLeft: 5,
    marginBottom: 1,
    paddingBottom: 2,
    fontSize: 14,
  },
  action: {
    marginLeft: 50,
    marginTop: 0,
    paddingLeft: 5,
    fontSize: 14,
  },
  active: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
});

const Home = () =>{
  const [library_topics, setLibrary_topics] = useState([]);
  const [currentLibrary_topic, setCurrentLibrary_topic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(1)

  useEffect(() => {
    retrieveLibrary_topics();
  }, []);

  const retrieveLibrary_topics = () => {
    Library_topicDataService.getAll()
      .then(response => {
        setIsLoading(false);
        setLibrary_topics(response.data);
        console.log(Cookies.get('name'))
      })
      .catch(e => {
        console.log(e);
      });
  };


  const refreshList = () => {
    retrieveLibrary_topics();
    setCurrentLibrary_topic(null);
    setCurrentIndex(-1);
  };

  const setActiveLibrary_topic = (library_topic, index) => {
    setCurrentLibrary_topic(library_topic);
    setCurrentIndex(index);
  };

  const newLocation = (external) => {
    window.open(external)
  }

  const classes = useStyles();
  
  return (
    <div className="">
    {console.log(document.cookie)}
    <Grid container>
        <Grid item xs={12} sm={8} lg={9}  spacing={1} component={Paper}  className={classes.root}>
            {isLoading ? (<div>Data loading, please wait..
                <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                </div>
            ) : (
                <div align="center">
                  <Card className={classes.root} variant="outlined" component="nav" >
                    {library_topics &&
                      library_topics.map((library_topic, index) => (
                        <div>
                    <CardContent align="left">
                    <Typography variant="h6" component="h7" className={classes.topic} button key={index}
                            selected={currentIndex === index}
                            onClick={() => setActiveLibrary_topic(library_topic, index)}>
                      <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                      </Avatar>
                      {library_topic.title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" className={classes.sub}>
                      {new Date(library_topic.createdAt).toUTCString().slice(0, 30)} | Author: {library_topic.author}.
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.para}>{library_topic.content.substring(0, 224)+"..."}<Link to={`/category/${library_topic.category}/${library_topic.topic_id}`}>read more</Link>
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.action}>
                    <Button size="small">Views</Button>&ensp;|
                    <Button size="small">Comments</Button>&ensp;|
                    <Button size="small">Likes</Button>
                  </CardActions>
                  <Divider />
                  </div>
                ))}
                </Card>
              </div>
          )}
        </Grid>
        <Grid item xs={13} sm={3} lg={2} className="rightSide">
          <h4>we we</h4>
        </Grid>
      </Grid>
    </div>
  )
  }
export default Home;