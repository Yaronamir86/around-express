const fsPromises = require('fs').promises;

const getDataFromFile = (file) => fsPromises
  .readFile(file, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .catch((err) => err);

module.exports = getDataFromFile;
