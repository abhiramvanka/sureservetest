/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');
//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sure'
});

connection.connect();

global.db = connection;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'myapp',
    resave: false,
    saveUninitialized: true,
}))


console.log("server started");
app.get('/', routes.index); //call for main index page
app.get('/login', user.login); //call for login page
app.get('/signup', user.signup); //call for signup get 
app.get('/profile', user.profile); //call for profile page
app.post('/signup', user.signup); //call for signup post
app.get('/checker', user.checker); //call for duplicate user check
app.get('/logout', user.logout); //call for logout
app.post('/login', user.login); //to render users profile
app.listen(3000)