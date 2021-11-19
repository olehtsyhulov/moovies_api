const express = require('express');
const routes = require('../constants/routePath');
const Genres = require('../controllers/Genres');
const router = express.Router();
const isAuth = require('../middleware/check-is-auth');
const pgClient = require('../utils/database');
const { getGenres, setGenres, updateGenre, deleteGenre } = new Genres(pgClient);

router.get(routes.genres.genres, getGenres);
router.post(routes.genres.genres, isAuth, setGenres);
router.put(routes.genres.genres, isAuth, updateGenre);
router.delete(routes.genres.genres, isAuth, deleteGenre);

module.exports = router;
