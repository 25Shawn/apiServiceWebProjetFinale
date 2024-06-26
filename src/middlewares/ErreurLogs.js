const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const errorLogStream = fs.createWriteStream(path.join(__dirname,'../', 'error.log'), { flags: 'a' });

const logger = morgan('combined', { stream: errorLogStream, skip: (req, res) => res.statusCode < 500 });

module.exports = {logger};
