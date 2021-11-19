const Languages = require('../models/LanguagesModel');

class GenresController {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }

  async getLanguages(_, res) {
    try {
      const languages = await Languages.getLanguages();
      res.status(200).send(languages);
    } catch (error) {
      console.log(error);
      res.send({ message: 'Something went wrong' });
    }
  }
}

module.exports = GenresController;
