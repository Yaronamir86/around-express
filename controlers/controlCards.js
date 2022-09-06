const Card = require('../models/card');
const {
  CREATE,
  INVALID_DATA,
  NOT_FOUND,
  SERVER_ERROR,
  INVALID_DATA_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

// GET REQUEST
// ROUTE = ('/cards')
const getCards = (req, res) =>
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(SERVER_ERROR).send(err));

// POST REQUEST
// ROUTE = ('/cards')
const createCard = (req, res) => {
  const {
    name, link
  } = req.body;
  const { _id } = req.user;
  Card.create({
    name, link, owner: _id
  })
    .then((card) => res.status(CREATE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ error: err.message });
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });
};

// DELETE REQUEST
// ROUTE = ('/cards/:_id')
const deleteCardById = (req, res) => {
  const { _id } = req.params;
  Card.findByIdAndRemove(_id)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ error: CARD_NOT_FOUND_MESSAGE });
      } else if (err.name === 'castError') {
        res.status(INVALID_DATA).send({ error: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });
};

// PUT REQUEST
// ROUTE = ('/cards/:_id/likes')
const likeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ Error: CARD_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ Error: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ Error: SERVER_ERROR_MESSAGE });
      }
    });
};

// DELETE REQUEST, ROUTE = ('/cards/:_id/likes')
const disLikeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ Error: CARD_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ Error: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ Error: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, disLikeCard
};
