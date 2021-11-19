const Movies = require('../models/MoviesModel');
const { getMovieSearchParams } = require('../helpers/movieSearch');

class Movie {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }

  async getMovies(req, res) {
    try {
      const { page, per_page }  = req.query;
      const searchQuery = await getMovieSearchParams(req.query);
      const movies = await Movies.getMoviesModal(searchQuery, page, per_page);
      res.status(200).send(movies);
    } catch (error) {
      res.send({ message: 'Something went wrong' });
    }
  }

  async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movies.getMoviesByIdModal(id);
      res.status(200).send(movie);
    } catch (error) {
      res.status(422).send({ message: 'No results' });
    }
  }
}

module.exports = Movie;
