var request = require('request');
var Package = require('./models/Package');
var Status = require('./models/Status');

KUAIDI_100_DETECT_COM_URL = 'http://www.kuaidi100.com/autonumber/autoComNum?text=';
KUAIDI_100_QUERY_URL = 'http://www.kuaidi100.com/query?type={com}&postid={id}';

var detectCompany = function (id, callback) {
    request.get(KUAIDI_100_DETECT_COM_URL + id, function (err, res, body) {
        var obj = JSON.parse(body);
        callback(obj.auto[0].comCode);
    });
};

var _queryPackageByKuaidi100 = function (id, com, callback) {
    request.get(KUAIDI_100_QUERY_URL.replace('{id}', id).replace('{com}', com), function (err, res, body) {
       var obj = JSON.parse(body);
       var package = new Package({
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
       callback(package);
    });
};
var queryPackageByKuaidi100 = function (id, com, callback) {
    if (!id) callback(null);
    if (!com) {
        detectCompany(id, function (code) {
            com = code;
            _queryPackageByKuaidi100(id, com, callback);
        });
    } else {
        _queryPackageByKuaidi100(id, com, callback);
    }
};

var express = require('express');
var router = express.Router();

router.get('/query', function (req, response, next) {
    var id = req.query['id'];
    var com = req.query['com'];

    if (!id) {
        response.json({message: 'Missing id parameter', code: -3});
        return
    }
    queryPackageByKuaidi100(id, com, function (package) {
        response.json({message: 'Done', code: 0, data: package});
    });
});

router.get('/detect_company', function (req, response, next) {
    var id = req.query['id'];

    if (!id) {
        response.json({message: 'Missing id parameter', code: -3});
        return
    }
    detectCompany(id, function (code) {
        response.json({message: 'Done', code: 0, company: code});
    });
});

router.queryPackage = queryPackageByKuaidi100;
router.detectCompany = detectCompany;

module.exports = router;