const jwt = require('jsonwebtoken');
const { PROTECTED_ROUTES, PROTECTED_ROUTER_WITH_METHODS } = require('../constants/protectedRoutes');

require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.get('token');
  const role = req.get('role');
  if (!token) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (PROTECTED_ROUTES.includes(req && req.route && req.route.path) && role !== 'admin') {
    const error = new Error('Only admins can send request.');
    error.statusCode = 401;
    throw error;
  }
  if (PROTECTED_ROUTER_WITH_METHODS.includes(req && req.route && req.route.path) &&
      role !== 'admin' &&
      req && req.method !== 'GET'
  ) {
    const error = new Error('Only admins can send request.');
    error.statusCode = 401;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
