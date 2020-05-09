var express = require('express');
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




app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);
var hostname = '127.0.0.1';
