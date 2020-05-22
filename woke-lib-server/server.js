const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
var FileStore = require('session-file-store')(session);;

const app = express();



/*var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
*/

var whitelist = ['http://localhost:3000', 'desktop-hdv5l9a:3000', '192.162.43.166:3000', 'https://engrcollins.github.io'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cookieParser())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'peng',
	resave: false,
  saveUninitialized: true,
  store:new FileStore({
    url: 'localhost:3100'
  }),
  cookie:{
    maxAge:36000,
    httpOnly:false,
    secure:false // for normal http connection if https is there we have to set it to true
    },
  overwrite: false
}));


// simple route
app.get("/", (req, res) => {
  if(req.session.page_views){
    req.session.page_views++;
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.page_views + '</p>')
    res.write("<p>You visited McCollins Technologies " + req.session.page_views + ' times, ' + req.sessionID +'</p>')
    res.end()
 } else {
    req.session.page_views = 1;
    res.json({ message: "Welcome to McCollins Technologies." });
 }
 console.log(req.sessionID);
});

//logout route
app.get('/logout', (req, res) =>{
  console.log(req.sessionID);
  req.session.destroy(function(err) {
    console.log("Session destroyed successfuly");
    console.log(req.sessionID);
    res.status(200);
    res.json({ message: "Session destroyed successfuly" });
    res.end;
  })
})

require("./app/routes/login.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/topic.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
