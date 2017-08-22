var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MODEL = Schema({
    message: {type: String},
    id: {type: String},
    company: {type: String},
    statusCode: {type: String},
    state: {type: String},
    isChecked: {type: Boolean},
    data: {type: Array},
    updateTime: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Package', MODEL);