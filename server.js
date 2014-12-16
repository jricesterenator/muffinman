var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

/* App Config */
mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uw03mpu');

app.use(express.static(__dirname + '/public')); //set the static files location
app.use(morgan('dev')); //log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));  //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse application/vnd.api+json as json
app.use(methodOverride());

/* Start */
app.listen(8080);
console.log("Listening on 8080");
