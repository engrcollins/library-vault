import React, { useState } from "react";
import './AddCustomer.css'
import Library_userDataService from "../services/Library_userService";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles({
    root: {
      width: '100%',
      minWidth: 410,
    },
    table: {
      minWidth: 360,
    },
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  });

const Registration= () => {
  const initialLibrary_userState = {
    id: null,
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    createdAt: ""
  };
  const [library_user, setLibrary_user] = useState(initialLibrary_userState);
  const [submitted, setSubmitted] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [errors, setErrors] = useState({})


  const handleInputChange = event => {
    const { name, value } = event.target;
    setLibrary_user({ ...library_user, [name]: value });
  };
   const toggleShow = event => {
       if (hidden){
           setHidden(false);
       }else{
           setHidden(true)
       };
  };

    const validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateForm = (value) => {
        const errors = {}
        if (!value.firstName) errors.firstName = "First name is required";
        if (!value.lastName) errors.lastName = "Last name is required";
        if (!value.gender) errors.gender = "Please select your gender";
        if (!value.birthDate) errors.birthDate = "Please input your Date of Birth";
        if (!value.username) errors.username = "Username is required";
        if (!value.phone) errors.username = "phone is required";
        if (!value.email) errors.email = "Email address is required";
        else if (!validateEmail(value.email)) errors.email = "Not a valid email address";
        if (!value.password) errors.password = "Password is required";
        else if (value.password === value.username) errors.password = "Please provide a password different from your username";
        else if (!value.confirmPassword) errors.confirmPassword = "Please repeat the password";
        else if (value.password !== value.confirmPassword) errors.confirmPassword = "Passwords don't match";

        return errors
        }

  const saveLibrary_user = () => {
        var data = {
        firstName: library_user.firstName,
        lastName: library_user.lastName,
        gender: library_user.gender,
        birthDate: library_user.birthDate,
        username: library_user.username,
        phone: library_user.phone,
        email: library_user.email,
        password: library_user.password,
        confirmPassword: library_user.confirmPassword,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        const errors = validateForm(data)
        setErrors(errors)
        if (!Object.keys(errors).length) {

    Library_userDataService.create(data)
      .then(response => {
        setLibrary_user({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          gender: response.data.gender,
          birthDate: response.data.birthDate,
          username: response.data.username,
          phone: response.data.phone,
          email: response.data.email,
          password: response.data.password,
          createdAt: response.data.createdAt
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const newLibrary_user = () => {
    setLibrary_user(initialLibrary_userState);
    setSubmitted(false);
    setHidden(true);
  };

  const classes = useStyles();
  return (
    <div className="library_user-form">
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>Topic created successfully!</h4>
            <button className="btn btn-success" onClick={newLibrary_user}>
              Create Another
            </button>
          </div>
        ) : (
          <div article-form="true">
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center"><strong>Library Registration Form</strong>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="firstName">First Name: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="firstName"
                        required
                        placeholder="Type your first name here"
                        value={library_user.firstName}
                        onChange={handleInputChange}
                        name="firstName"
                    />
                        {errors.firstName && <p>{errors.firstName}</p>}
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="lastName">Last Name: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="lastName"
                        required
                        placeholder="Type your last name here"
                        value={library_user.lastName}
                        onChange={handleInputChange}
                        name="lastName"
                    />
                        {errors.lastName && <p>{errors.lastName}</p>}
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="gender">Gender: </label></TableCell>
                    <TableCell align="left"><select id="gender" required value={library_user.gender || ""}
                        onChange={handleInputChange} name="gender">
                        <option value="" disabled selected hidden>Please choose your gender...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>           
                      </select>
                      {errors.gender && <p>{errors.gender}</p>}
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="birthDate">Date of Birth: </label></TableCell>
                    <TableCell align="left"><TextField
                        id="birthDate"
                        label="Birthday"
                        type="date"
                        defaultValue="2000-01-24"
                        value={library_user.birthDate}
                        onChange={handleInputChange}
                        name="birthDate"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                        {errors.birthDate && <p>{errors.birthDate}</p>}
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="username">Username: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="username"
                        required
                        placeholder="Pick a username(min of 4 characters)"
                        value={library_user.username|| ""}
                        onChange={handleInputChange}
                        name="username"
                    />
                        {errors.username && <p>{errors.username}</p>}
                    </TableCell>
                    </TableRow>
                    
                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="phone">Phone: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="phone"
                        required
                        placeholder="Input your mobile phone number"
                        value={library_user.phone|| ""}
                        onChange={handleInputChange}
                        name="phone"
                    />
                        {errors.phone && <p>{errors.phone}</p>}
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="email">e-mail: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="email"
                        required
                        placeholder="Input your email address"
                        value={library_user.email|| ""}
                        onChange={handleInputChange}
                        name="email"
                    />
                        {errors.email && <p>{errors.email}</p>}
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="password">Password: </label></TableCell>
                    <TableCell align="left"><input
                        type={hidden ? "password" : "text"}
                        className="input-field"
                        id="password"
                        required
                        placeholder="Pick a password(min of 8 characters)"
                        value={library_user.password|| ""}
                        onChange={handleInputChange}
                        name="password"
                    />
                        {errors.password && <p>{errors.password}</p>}
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="confirmPassword">Confirm Password: </label></TableCell>
                    <TableCell align="left" ><input
                        type={hidden ? "password" : "text"}
                        className="input-field"
                        id="confirmPassword"
                        required
                        placeholder="Retype your password here"
                        value={library_user.confirmPassword|| ""}
                        onChange={handleInputChange}
                        name="confirmPassword"
                    />&ensp;<button onClick={toggleShow}>{hidden ? (<VisibilityOffIcon style={{fontSize:'20px', width: '11px', height: '11px', padding:'-2px'}}/>) : (<VisibilityIcon style={{fontSize:'20px', width: '11px', height: '11px', padding:'-2px'}} />)}</button>
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>

                <button onClick={saveLibrary_user} className="btn btn-success">
                Submit
                </button>
                <br/>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;