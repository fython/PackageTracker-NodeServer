var express = require('express');
var mongoose = require('./database');
var subscribeapi = require('./subscribeapi');
var queryapi = require('./queryapi');
var bodyParser = require('body-parser');

mongoose.connection.on('connected', function () {
    console.log("Connected to database");

    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    var port = process.env.PORT || 3000;

    app.use('/subscribe', subscribeapi);
    app.use('/', queryapi);

    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log("Running at http://%s:%s", host, port);
    });
});