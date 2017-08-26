const Schedule = require('node-schedule');
const User = require('./models/User');
const Package = require('./models/Package');
const QueryApi = require('./queryapi');
const FirebaseApi = require('./firebaseapi');

async function queryUsers(users) {
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
                let history = (await Package.find({id: id}).exec())[0];
                let result = await QueryApi.queryPackage(id, com);
                if (result.statusCode == 200) {
                    console.log(`Push user: ${target}, package id: ${id}, data: ${JSON.stringify(result)}`);
                    if (history) {
                        result._id = history._id;
                    }
                    if (!history || (history && result.data.length > history.data.length)) {
                        FirebaseApi.pushPackage(target, result)
                    }
                    if (history) {
                        history.data = result.data;
                        history.state = result.state;
                        history.isChecked = result.isChecked;
                        history.save()
                    } else if (result !== null) {
                        result.save()
                    }
                } else {
                    console.log(`Package id: ${id} error, ignore it.`);
                }
            }
        }
        resolve(true)
    })
}

function findUserAndQueryAll() {
    User.find(function (err, res) {
        if (err) {
            console.log('Cannot read user db. ' + err.message);
        } else {
            console.log(`Start check ${res.length} user(s). Package counts: ${
                res.map(item => item.subscribes.length).reduce((t, next) => `${t}, ${next}`)
                }`);
            if (res && res instanceof Array) {
                queryUsers(res);
            }
        }
    })
}

function scheduleQueryTask() {
    let rule = new Schedule.RecurrenceRule();
    rule.minute = [0, 10, 20, 30, 40, 50];

    Schedule.scheduleJob(rule, findUserAndQueryAll);
}

exports.scheduleQueryTask = scheduleQueryTask;
exports.findUserAndQueryAll = findUserAndQueryAll;
exports.queryUsers = queryUsers;