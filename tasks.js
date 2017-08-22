const Schedule = require('node-schedule');
const User = require('./models/User');
const QueryApi = require('./queryapi');
const FirebaseApi = require('./firebaseapi');

async function queryAllUser(users) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < users.length; i++) {
            let target = users[i].deviceToken;
            let subscribes = users[i].subscribes;
            for (let j = 0; j < subscribes.length; j++) {
                let id = subscribes[j];
                let com = null;
                if (id.indexOf('+') !== -1) {
                    com = id.substr(id.indexOf('+') + 1);
                    id = id.substr(0, id.indexOf('+'));
                }
                let result = await QueryApi.queryPackage(id, com);
                if (result.statusCode == 200) {
                    console.log(`Push user: ${target}, package id: ${id}, data: ${JSON.stringify(result)}`);
                    FirebaseApi.pushPackage(target, result)
                } else {
                    console.log(`Package id: ${id} error, ignore it.`);
                }
            }
        }
        resolve(true)
    })
}

function scheduleQueryTask() {
    let rule = new Schedule.RecurrenceRule();
    rule.second = [0, 15, 30, 45];

    Schedule.scheduleJob(rule, function () {
        User.find(function (err, res) {
            if (err) {
                console.log('Cannot read user db. ' + err.message);
            } else {
                console.log(`Start check ${res.length} user(s). Package counts: ${
                    res.map(item => item.subscribes.length).reduce((t, next) => `${t}, ${next}`)
                    }`);
                if (res && res instanceof Array) {
                    queryAllUser(res);
                }
            }
        })
    });
};

exports.scheduleQueryTask = scheduleQueryTask;