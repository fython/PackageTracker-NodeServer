var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MODEL = Schema({
    content: {type: String},
    time: {type: Date, default: Date.now},
    location: {type: String}
});

module.exports = mongoose.model('Status', MODEL);