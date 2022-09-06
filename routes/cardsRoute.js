const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, disLikeCard
} = require('../controlers/controlCards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:_id', deleteCardById);
router.put('/cards/:_id/likes', likeCard);
router.delete('/cards/:_id/likes', disLikeCard);

module.exports = router;
