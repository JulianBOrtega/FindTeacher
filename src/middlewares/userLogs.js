const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) =>
{
    fs.appendFileSync(path.join(__dirname, '..', 'logs', 'userLogs.txt'), "\nEl usuario ingresó a la ruta: " + req.url, 'utf-8');
    next();
}