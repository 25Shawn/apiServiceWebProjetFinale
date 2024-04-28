const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Créer un stream d'écriture pour les erreurs 500
const errorLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs', 'error.log'), { flags: 'a' });


const logger = morgan('combined', { stream: errorLogStream, skip: (req, res) => res.statusCode < 500 });

module.exports = {logger};
