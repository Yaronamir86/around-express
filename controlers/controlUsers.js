const path = require('path');
const getDataFromFile = require('../helpers/files');

const usersPath = path.join(__dirname, '..', 'data', 'usersData.json');

const getUsers = (req, res) => {
  getDataFromFile(usersPath)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

const getUserById = (req, res) => {
  getDataFromFile(usersPath)
    .then((users) => users.find((user) => user._id === req.params._id))
    .then((user) => {
      if (user) {
        res.status(200).send(user);
        return;
      }
      res.status(404).send({ message: 'User ID not found' });
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = { getUsers, getUserById };
