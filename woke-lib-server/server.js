const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const cors = require("cors");

const app = express();

/*var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
*/

var whitelist = ['http://localhost:3000', 'http://desktop-hdv5l9a:3000', 'https://engrcollins.github.io', 'https://dev-catalog.netlify.app'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	secret: 'peng',
	resave: true,
	saveUninitialized: true
}));

// simple route
app.get("/", (req, res) => {
  if(req.session.page_views){
    req.session.page_views++;
    res.send("You visited McCollins Technologies " + req.session.page_views + " times, " + req.session.loggedin);
 } else {
    req.session.page_views = 1;
    res.json({ message: "Welcome to McCollins Technologies." });
 }
});

require("./app/routes/login.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/topic.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
