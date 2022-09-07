const User = require('../models/user');

const {
  CREATE,
  INVALID_DATA,
  SERVER_ERROR,
  INVALID_DATA_MESSAGE,
  SERVER_ERROR_MESSAGE,
  userIdValidateProcess,
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
  userIdValidateProcess(
    req,
    res,
    User.findById(_id)
  );
};

// PATCH REQUEST
// ROUTE = ('/users/me')
const updateUser = (req, res) => {
  const { _id } = req.user;
  userIdValidateProcess(
    req,
    res,
    User.findByIdAndUpdate(
      _id,
      { name: req.body.name, about: req.body.about },
      { runValidators: true, new: true }
    )
  );
};

// PATCH REQUEST
// ROUTE = ('/users/me/avatar')
const updateAvatar = (req, res) => {
  const { _id } = req.user;
  userIdValidateProcess(
    req,
    res,
    User.findByIdAndUpdate(
      _id,
      { avatar: req.body.avatar },
      { runValidators: true, new: true }
    )
  );
};

module.exports = {
  getUsers, createUser, getUserById, updateUser, updateAvatar
};
