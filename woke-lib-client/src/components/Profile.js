import React, { useState, useEffect } from "react";
import './Form.css'
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import Card from '@material-ui/core/Card';
import collins from "../materials/collins.jpg"
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Profile_detailsDataService from "../services/Profile_detailsService";
import { Grid } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';



const useStyles = makeStyles({
    root: {
        padding: 1,
        width: '99%',
        padding: 2,
        border: 2,
        borderColor: 'rgb(51, 173, 255)',
    },
    image: {
        width: 150,
        height: 150,
        paddingTop: 10,
        borderRadius: "30%",
    },
    table: {
      minWidth: 360,
    },
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  });

const Profile = props => {

    const [profile_details, setProfile_details] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getProfile_details = username => {
        Profile_detailsDataService.get(username)
          .then(response => {
            setIsLoading(false); 
            var cr = new Date(response.data.createdAt);
            var bd = new Date(response.data.birthDate);
            var crn = cr.toUTCString().slice(0, 30);
            var bdn = bd.toUTCString().slice(5, 12);
            response.data.birthDate = bdn;
            response.data.createdAt = crn;
            setProfile_details(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      useEffect(() => {
        getProfile_details(props.match.params.username);
      }, [props.match.params.username]);
      const classes = useStyles();

    return(
        <div className="">
            {console.log(document.cookie)}
            <Grid container spacing={3} >
                <br />
                <br />
                <Grid item xs={12} sm={8} lg={8} >
                    {isLoading ? (<div>Data loading, please wait..
                        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                        </div>
                    ) : (
                        <Card align="center" className={classes.root}>
                        <Typography gutterBottom variant="h4" component="h4">
                        Library Member Profile
                        </Typography>
                            <CardMedia className={classes.image}
                            component="img"
                            alt="Profile Pic"
                            height="140"
                            image={collins}
                            title="Collins Akinbami"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h3">
                                {profile_details.firstName} &nbsp; {profile_details.lastName}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" component="p">
                                Admin, Woke Library
                            </Typography>
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table" gutterBottom variant="body1" component="p">
                                <TableHead>
                                    <TableRow>
                                    <TableCell colSpan={2} align="center"><strong>Personal Details</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                    <TableCell align="left"><label className="labelling" htmlFor="title">Library Username: </label></TableCell>
                                    <TableCell align="left">{props.match.params.username}
                                    </TableCell>
                                    </TableRow>

                                    <TableRow>
                                    <TableCell align="left"><label className="labelling" htmlFor="title">Location: </label></TableCell>
                                    <TableCell align="left">Lagos
                                    </TableCell>
                                    </TableRow>

                                    <TableRow>
                                    <TableCell align="left"><label className="labelling" htmlFor="title">Birthday: </label></TableCell>
                                    <TableCell align="left">{profile_details.birthDate}
                                    </TableCell>
                                    </TableRow>

                                    <TableRow>
                                    <TableCell align="left"><label className="labelling" htmlFor="title">Date Registered: </label></TableCell>
                                    <TableCell align="left">{profile_details.createdAt}
                                    </TableCell>
                                    </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                                <Button size="small" color="primary">
                                    <a href="https://twitter.com/engrcollins14" target="_blank"><TwitterIcon style={{ display: "inline-block", marginBottom:"-5px", fontSize:"20px" }}/></a>Twitter
                                </Button>
                                <Button size="small" color="primary"><a href="https://facebook.com/engrcollins14" target="_blank"><FacebookIcon style={{ display: "inline-block", marginBottom:"-5px", fontSize:"20px" }}/>Facebook, </a>
                                </Button>
                                <Button size="small" color="primary"><a href="https://qr.ae/TmZyQH" target="_blank">Quora, </a>
                                </Button>
                                <Button size="small" color="primary"><a href="https://medium.com" target="_blank">Medium.</a>
                                </Button>
                        </CardContent>
                        <CardActions>
                            <Button align="center" size="medium" color="primary">
                                Mail {props.match.params.username}
                            </Button>
                        </CardActions>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};
export default Profile;