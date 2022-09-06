const User = require('../models/user');

const {
  CREATE,
  INVALID_DATA,
  NOT_FOUND,
  SERVER_ERROR,
  INVALID_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

// GET REQUEST
// ROUTE = ('/users')
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(SERVER_ERROR).send(err));
};

// POST REQUEST
// ROUTE = ('/users')
const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(CREATE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ error: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });
};

// GET REQUEST
// ROUTE = ('/users/:_id')
const getUserById = (req, res) => {
  const { _id } = req.params;
  User.findById(_id)
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ error: USER_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ error: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });
};

// patch REQUEST
// ROUTE = ('/users/me')
const updateUser = (req, res) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ error: USER_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ error: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });
};

// patch REQUEST
// ROUTE = ('/users/me/avatar')
const updateAvatar = (req, res) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { avatar: req.body.avatar },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ error: USER_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ error: INVALID_DATA_MESSAGE });
      } else if (err.name === 'ValidationError') {
        (res.status(INVALID_DATA).send({ error: err.message }));
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports = {
  getUsers, createUser, getUserById, updateUser, updateAvatar
};
