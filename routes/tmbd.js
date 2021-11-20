const express = require('express');
const routes = require('../constants/routePath');
const ParseDataFromTMBD = require('../controllers/ParseDataFromTMBD');
const router = express.Router();
const isAuth = require('../middleware/check-is-auth');
// const { getGenres, getFilms, getLanguages, getInitDataBase } = new ParseDataFromTMBD();

router.get(routes.tmbd.genres, isAuth, ParseDataFromTMBD.getGenres);
router.get(routes.tmbd.get_movies, isAuth, ParseDataFromTMBD.getFilms);
router.get(routes.tmbd.get_languages, isAuth, ParseDataFromTMBD.getLanguages);
router.get(routes.tmbd.init_data_base, ParseDataFromTMBD.getInitDataBase);

module.exports = router;
