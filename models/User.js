var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MODEL = Schema({
    deviceToken: {type: String},
    registerTime: {type: Date, default: Date.now},
    subscribes: {type: Array}
});

module.exports = mongoose.model('User', MODEL);