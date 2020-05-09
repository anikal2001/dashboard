var express = require('express');
var firebase = require("firebase/app");
var serveStatic = require('serve-static');
var path = require('path');
app = express();

app.use(express.json());

const bodyParser = require("body-parser");

var cors = require('cors')

app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);


// Add the Firebase products that you want to use
require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyBd63jpzF1J2dErNMC_yW-eSTjw2uOnhF4",
    authDomain: "terminal-prototype.firebaseapp.com",
    databaseURL: "https://terminal-prototype.firebaseio.com",
    projectId: "terminal-prototype",
    storageBucket: "terminal-prototype.appspot.com",
    messagingSenderId: "354894608266",
    appId: "1:354894608266:web:b76df36fe732cae19f7a73",
    measurementId: "G-F12RQDHE5J"
  };




app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);
var hostname = '127.0.0.1';

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });