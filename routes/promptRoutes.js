const express = require('express');
const {
  createPrompt,
  getPrompts,
  searchPrompts,
  getPromptById,
  updatePrompt,
  toggleFavorite,
  deletePrompt
} = require('../controllers/promptController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createPrompt)
  .get(getPrompts);

router.get('/search', searchPrompts);

router.route('/:id')
  .get(getPromptById)
  .put(updatePrompt)
  .delete(deletePrompt);

router.patch('/:id/favorite', toggleFavorite);

module.exports = router;
