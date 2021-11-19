const fs = require('fs');

module.exports = {
  connectionString: fs.readFileSync('resources.txt', 'utf8'),
};
