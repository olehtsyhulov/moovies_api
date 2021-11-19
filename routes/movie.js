const express = require('express');
const routes = require('../constants/routePath');
const Movie = require('../controllers/Movie');
const router = express.Router();
const pgClient = require('../utils/database');
const { getMovies, getMovieById } = new Movie(pgClient);

router.get(routes.movie.movie, getMovies);
router.get(`${routes.movie.movie}/:id`, getMovieById);

module.exports = router;
