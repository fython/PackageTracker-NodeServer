const express = require('express');
const mongoose = require('mongoose');
const subscribeapi = require('./subscribeapi');
const queryapi = require('./queryapi');
const tasks = require('./tasks');
const bodyParser = require('body-parser');

const DB_URL = 'mongodb://127.0.0.1:27017/ptpush';

console.log("Connecting to " + DB_URL + "...");
mongoose.connect(DB_URL, { useMongoClient: true }).then(
    () => {
        console.log("Connected to database");

        let app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        let port = process.env.PORT || 3000;

        app.use('/subscribe', subscribeapi);
        app.use('/', queryapi);

        let server = app.listen(port, () => {
            let host = server.address().address;
            let port = server.address().port;

            console.log("Running at http://%s:%s", host, port);

            tasks.scheduleQueryTask();
        });
    },
    err => { console.log(err.message) }
);

mongoose.connection.on('disconnected', () => { console.log('Disconnected.')});