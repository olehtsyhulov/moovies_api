const express = require('express');
const routes = require('../constants/routePath');
const CommentsForReviewController = require('../controllers/CommentsForReviewController');
const router = express.Router();
const isAuth = require('../middleware/check-is-auth');
const {
  getCommentsForReview,
  createCommentForReview,
  deleteCommentForReview,
  updateCommentForReview,
} = new CommentsForReviewController();

router.route(routes.comments_for_review)
  .all(isAuth)
  .get(getCommentsForReview)
  .post(createCommentForReview)
  .put(updateCommentForReview)
  .delete(deleteCommentForReview);

module.exports = router;
