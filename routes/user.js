const express = require('express');
const routes = require('../constants/routePath');
const User = require('../controllers/User');
const router = express.Router();
const pgClient = require('../utils/database');
const { singUp, signIn } = new User(pgClient);

router.post(routes.user.sing_up, singUp);
router.post(routes.user.sign_in, signIn);

module.exports = router;
