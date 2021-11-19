const { validationForReview } = require('../helpers/validateReview');
const ReviewModel = require('../models/ReviewModel');
const CommentsForReviewModel = require('../models/CommentsForReviewModel');

class Review {
  async getReviewById(req, res) {
    try {
      const { movie_id } = req.query;

      if (!movie_id) throw { message: 'You need to pass movie_id' };

      const review = await ReviewModel.getReviewById(req.query);

      res.status(200).send(review);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async createReview(req, res) {
    try {
      const errorMessage = await validationForReview(req.body);

      if (errorMessage) throw errorMessage;

      const rateData = await ReviewModel.createReview(req.body);

      res.status(200).send(rateData);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async updateReview(req, res) {
    try {
      const errorMessage = await validationForReview(req.body);
      if (errorMessage) throw errorMessage;

      const review = await ReviewModel.updateReviewById(req.body);

      res.status(200).send(review);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async deleteReviewById(req, res) {
    try {
      const { review_id } = req.body;
      if (!review_id || Number.isNaN(Number(review_id))) throw { message: 'You need pass review_id' };

      const isDeleteAllComments = await CommentsForReviewModel
        .deleteAllCommentsForReviewByReviewId({ review_id });

      let response;
      if (isDeleteAllComments) {
        response = await ReviewModel.deleteReviewById({ review_id });
      }

      res.status(200).send(response);

    } catch (error) {
      res.status(402).send({ message: 'Something went wrong' });
    }
  }
}

module.exports = Review;
