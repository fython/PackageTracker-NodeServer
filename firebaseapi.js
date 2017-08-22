const request = require('request-promise-native');

const FCM_SEND_URL = 'https://fcm.googleapis.com/fcm/send';

function pushPackage(target, pack) {
    return new Promise((resolve, reject) => {
        let options = {
            proxy: 'http://127.0.0.1:1080',
            method: 'POST',
            uri: FCM_SEND_URL,
            headers: {
                'Authorization': 'key=AAAAxc1JKJs:APA91bFKK25cPksulgFjr9-F01cvLNUlDM9Vyq8h5hSFHpnbNJ5YFEqUFAAt6eYbxS9mugJxE6CRBctNtW5KdfCckG7J-PhwwOcVUxNx15__qZ9i822LQlzXGX3ej0SE6F_hZz4gbL7I',
                'Content-Type': 'application/json'
            },
            body: {
                'to': target,
                'data': pack
            },
            json: true
        };
        request.post(options).then(result => {
            console.log('Result: ' + JSON.stringify(result));
            resolve(true)
        }).catch(err => {
            console.log('Failed. ' + err.message);
            resolve(false)
        })
    })
}

exports.pushPackage = pushPackage;