const mongoose = require('mongoose');
const { dbUrl, options } = require('./config');

async function connect() {
 await mongoose.connect(dbUrl, options);
  console.log('Connected to BD');
}


module.exports = connect;
