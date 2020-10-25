const fs = require('fs');
module.exports = JSON.parse(fs.readFileSync(`${process.cwd()}/config.json`, 'utf8'));
