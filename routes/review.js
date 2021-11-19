const express = require('express');
const router = express.Router();

const routes = require('../constants/routePath');
const Review = require('../controllers/Review');

const isAuth = require('../middleware/check-is-auth');
const { createReview, getReviewById, updateReview, deleteReviewById } = new Review();

router.route(routes.review)
  .all(isAuth)
  .get(getReviewById)
  .post(createReview)
  .put(updateReview)
  .delete(deleteReviewById);

module.exports = router;
