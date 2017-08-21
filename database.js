var mongoose = require('mongoose');
DB_URL = 'mongodb://localhost:27017/ptpush';

console.log("Connecting to " + DB_URL + "...");
mongoose.connect(DB_URL);

module.exports = mongoose;