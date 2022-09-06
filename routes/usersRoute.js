const router = require('express').Router();
const {
  getUsers, createUser, getUserById, updateUser, updateAvatar
} = require('../controlers/controlUsers');

router.get('/users', getUsers);
router.get('/users/:_id', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
