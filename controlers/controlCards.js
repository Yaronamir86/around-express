const path = require('path');
const getDataFromFile = require('../helpers/files');

const cardsPath = path.join(__dirname, '..', 'data', 'cardsData.json');

const getCards = (req, res) =>
  getDataFromFile(cardsPath)
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err));

module.exports = getCards;
