const { isValidCreateComment } = require('../helpers/validation');
const CommentsForReviewModel = require('../models/CommentsForReviewModel');

class Rate {
  async getCommentsForReview(req, res) {
    try {
      const { review_id } = req.query;

      if (!review_id) throw { message: 'You need to pass review_id for getting comments' };

      const commentsForReview = await CommentsForReviewModel.getCommentsByReviewId(req.query);

      res.status(200).send(commentsForReview);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async createCommentForReview(req, res) {
    try {
      const errorMessage = await isValidCreateComment(req.body);

      if (errorMessage.isInvalid) throw errorMessage;

      const commentReviewData = await CommentsForReviewModel.createCommentForReview(req.body);

      res.status(200).send(commentReviewData);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async updateCommentForReview(req, res) {
    try {
      const errorMessage = await isValidCreateComment(req.body);

      if (errorMessage.isInvalid) throw errorMessage;

      const commentReviewData = await CommentsForReviewModel.updateCommentsForReview(req.body);

      res.status(200).send(commentReviewData);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async deleteCommentForReview(req, res) {
    try {
      const { comment_id, review_id } = req.body;
      if (!comment_id || Number.isNaN(Number(comment_id))) {
        throw { message: 'You need pass comment_id' };
      }
      if (!review_id || Number.isNaN(Number(review_id))) {
        throw { message: 'You need pass review_id' };
      }

      const commentReviewData = await CommentsForReviewModel.deleteCommentsForReview({ comment_id, review_id });

      res.status(200).send(commentReviewData);

    } catch (error) {
      res.status(402).send({ message: 'Something went wrong' });
    }
  }
}

module.exports = Rate;
