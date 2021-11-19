const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { registrationValidation, signInValidation } = require('../helpers/validation');
require('dotenv').config();

const secret = process.env.SECRET_KEY;
class UserController {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }

  async singUp(req, res) {
    try {
      const { isInvalid, ...validationErrors } = registrationValidation(req.body);

      if (isInvalid) {
        return res.status(400).send(validationErrors);
      }
      const { first_name, last_name, password, login, role } = req.body;
      const existedUser = await User.getUser(login);
      if (existedUser) {
        return res.status(403).send({ message: `User with login ${login} already exist` });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await User.addUser(login, first_name, last_name, hashedPassword, role);
      res.status(200).send({ message: 'Registration successful' });
    } catch (error) {
      console.log(error);
      res.send({ message: 'Something went wrong' });
    }
  }

  async signIn(req, res) {
    try {
      const { login, password } = req.body;
      const { isInvalid, ...validationErrors } = signInValidation(req.body);

      if (isInvalid) return res.status(401).send(validationErrors);

      const user = await User.getUser(login);
      if (!user) {
        const error = new Error('User with this login doesn\'t exist');
        error.statusCode = 401;
        throw error;
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          login: user.login,
          userId: user.id,
        },
        secret,
        { expiresIn: '300m' }
      );
      res.setHeader('access-token', token);
      res.setHeader('role', user.role);
      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      res.send({ message: error.message });
    }
  }
}

module.exports = UserController;
