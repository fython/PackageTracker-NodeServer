const request = require('request');
const Package = require('./models/Package');
const Status = require('./models/Status');

const KUAIDI_100_DETECT_COM_URL = 'http://www.kuaidi100.com/autonumber/autoComNum?text=';
const KUAIDI_100_QUERY_URL = 'http://www.kuaidi100.com/query?type={com}&postid={id}';

async function detectCompany(id) {
    return new Promise((resolve, reject) => {
        request.get(KUAIDI_100_DETECT_COM_URL + id, function (err, res, body) {
            let obj = JSON.parse(body);
            if (obj.auto.length > 0) {
                resolve(obj.auto[0].comCode);
            } else {
                resolve(null);
            }
        });
    })
}

async function _queryPackageByKuaidi100(id, com) {
    return new Promise(function (resolve, reject) {
        request.get(KUAIDI_100_QUERY_URL.replace('{id}', id).replace('{com}', com), function (err, res, body) {
            try {
                let obj = JSON.parse(body);
                let pack = new Package({
                    message: obj.message,
                    id: obj.nu,
                    company: obj.com,
                    statusCode: obj.status,
                    state: obj.state,
                    isChecked: obj.ischeck === 1,
                    updateTime: Date.now(),
                    data: obj.data.map(function (item) {
                        return new Status({
                            content: item.context,
                            time: item.time,
                            location: item.location
                        });
                    })
                });
                resolve(pack);
            } catch (e) {
                console.log(e);
                resolve(null);
            }
        });
    })
}

async function queryPackageByKuaidi100(id, com) {
    return new Promise(async (resolve, reject) => {
        if (!id) resolve(null);
        if (!com) {
            com = await detectCompany(id)
        }
        resolve(await _queryPackageByKuaidi100(id, com))
    })
}

const express = require('express');
let router = express.Router();

router.get('/query', async (req, response, next) => {
    let id = req.query['id'];
    let com = req.query['com'];

    if (!id) {
        response.json({message: 'Missing id parameter', code: -3});
        return
    }
    let pack = await queryPackageByKuaidi100(id, com);
    response.json({message: 'Done', code: 0, data: pack});
});

router.get('/detect_company', function (req, response, next) {
    let id = req.query['id'];

    if (!id) {
        response.json({message: 'Missing id parameter', code: -3});
        return
    }

    detectCompany(id)
      .then(comCode => {
        response.json({message: 'Done', code: 0, company: comCode});
      })
});

router.queryPackage = queryPackageByKuaidi100;
router.detectCompany = detectCompany;

module.exports = router;
