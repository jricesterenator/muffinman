/*jslint node: true*/
/*jslint nomen: true*/
'use strict';

var fs = require('fs');
var express = require('express');
//var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

/* App Config */
//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uw03mpu');

app.use(express['static'](__dirname + '/public')); //set the static files location
app.use(morgan('dev')); //log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));  //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
app.use(bodyParser.raw());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse application/vnd.api+json as json
app.use(methodOverride());

var Steps = {
    INBOX: 0,
    NEXT_ACTION: 1
};

var Data = {

    tasks: [] 
    
};

var Dao = {
  
    getTasks: function () { 
        Data = JSON.parse(fs.readFileSync('data.json'));
        console.log("READ:" + JSON.stringify(Data));
        return Data.tasks;
    },
    
    insertTask: function (task) {
        if(Data.tasks === undefined) {
            Data.tasks = [];
        }
        Data.tasks.push(task);
        console.log("WRITING");
        console.log(task);
        fs.writeFileSync('data.json', JSON.stringify(Data));
    }
    
};


/* Routes */
app.get('/api/tasks', function (req, res) {
    res.json(Dao.getTasks());
});
    
app.post('/api/tasks', function (req, res) {
//    console.log(req.body);
//    Dao.insertTask(req.body.task);
    console.log(req.headers);
    console.log(req.body);

    Dao.insertTask(req.body.task);
    res.json(Dao.getTasks());
});
app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
});




/* Start */
app.listen(8080);
console.log("Listening on 8080");

