const express = require('express');
const routes = require('../constants/routePath');
const Rate = require('../controllers/Rate');
const router = express.Router();
const isAuth = require('../middleware/check-is-auth');
const { setRateForMovie, updateRateMovie, deleteRateMovie, getRate } = new Rate();

router.route(routes.rate.rate)
  .all(isAuth)
  .get(getRate)
  .post(setRateForMovie)
  .put(updateRateMovie)
  .delete(deleteRateMovie);

module.exports = router;
