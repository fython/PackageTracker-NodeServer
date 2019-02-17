const express = require('express');
const Http = require('http');
const Https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const subscribeapi = require('./subscribeapi');
const queryapi = require('./queryapi');
const tasks = require('./tasks');
const bodyParser = require('body-parser');
const Config = require('./config.js');

let DB_URL = Config.mongodb_server_url;

console.log("Connecting to " + DB_URL + "...");
mongoose.connect(DB_URL, { useMongoClient: true }).then(
    () => {
        console.log("Connected to database");

        let app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use('/subscribe', subscribeapi);
        app.use('/', queryapi);

        if (!Config.server_port) {
          let server_port = process.env.PORT;
        }

        if (Config.enable_https) {
          console.log("Https Server is enabled. Now loading credentials...");
          let privateKey = fs.readFileSync(Config.private_key_path, 'utf8');
          let certificate = fs.readFileSync(Config.certificate_path, 'utf8');
          let credentials = {key: privateKey, cert: certificate};

          let httpsServer = Https.createServer(credentials, app);
          httpsServer.listen(Config.server_https_port, () => {
            let host = httpsServer.address().address;
            let port = httpsServer.address().port;

            console.log("Https Server running at https://%s:%s", host, port);
          });
        } else {
          let httpServer = Http.createServer(app);
          httpServer.listen(Config.server_http_port, () => {
              let host = httpServer.address().address;
              let port = httpServer.address().port;

              console.log("Http Server running at http://%s:%s", host, port);
          });
        }
        tasks.scheduleQueryTask();
    },
    err => { console.log(err.message) }
);

mongoose.connection.on('disconnected', () => { console.log('Disconnected.')});
