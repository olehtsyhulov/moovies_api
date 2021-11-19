const express = require('express');
const routes = require('../constants/routePath');
const ParseDataFromTMBD = require('../controllers/ParseDataFromTMBD');
const router = express.Router();
const isAuth = require('../middleware/check-is-auth');
const pgClient = require('../utils/database');
const { getGenres, getFilms, getLanguages, getInitDataBase } = new ParseDataFromTMBD(pgClient);

router.get(routes.tmbd.genres, isAuth, getGenres);
router.get(routes.tmbd.get_movies, isAuth, getFilms);
router.get(routes.tmbd.get_languages, isAuth, getLanguages);
router.get(routes.tmbd.init_data_base, getInitDataBase);

module.exports = router;
