const { validationForRate } = require('../helpers/rateMovie');
const RateModel = require('../models/RateModel');

class Rate {
  async getRate(req, res) {
    try {
      const { user_id, movie_id } = req.query;

      if (!user_id || !movie_id) throw { message: 'You need to pass user_id and movie_id' };

      const rateData = await RateModel.getRateByUserIdAndMovieId(req.query);

      res.status(200).send(rateData);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async setRateForMovie(req, res) {
    try {
      //add validation for user role and active role
      const errorMessage = await validationForRate(req.body);

      if (errorMessage) throw errorMessage;

      const rateData = await RateModel.setRateMovieById(req.body);

      res.status(200).send(rateData);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async updateRateMovie(req, res) {
    try {
      //add validation for user role and active role
      const { rate_id } = req.body;
      if (!rate_id || Number.isNaN(Number(rate_id))) throw { message: 'You need pass rate_id' };

      const errorMessage = await validationForRate(req.body);

      if (errorMessage) throw errorMessage;

      const rateData = await RateModel.updateRateMovieById(req.body);

      res.status(200).send(rateData);
    } catch (error) {
      if (error.message) return res.status(422).send(error);
      res.status(402).send({ message: 'Something went wrong' });
    }
  }

  async deleteRateMovie(req, res) {
    try {
      //add validation for user role and active role
      const { rate_id } = req.body;
      if (!rate_id || Number.isNaN(Number(rate_id))) throw { message: 'You need pass rate_id' };

      const response = await RateModel.deleteRateMovieById({ rate_id });

      res.status(200).send(response);

    } catch (error) {
      res.status(402).send({ message: 'Something went wrong' });
    }
  }
}

module.exports = Rate;
