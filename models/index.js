const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.contacts = require('./contacts.js')(mongoose);
db.cellphones = require('./cellphones.js')(mongoose);

module.exports = db;
