const express = require('express');
const routes = require('../constants/routePath');
const Languages = require('../controllers/Languages');
const router = express.Router();
const pgClient = require('../utils/database');
const { getLanguages } = new Languages(pgClient);

router.get(routes.languages, getLanguages);

module.exports = router;
