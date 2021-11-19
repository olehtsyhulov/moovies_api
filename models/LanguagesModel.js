const pgClient = require('../utils/database');

class LanguagesModel {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }

  async getLanguages()  {
    try {
      const { rows } = await this.pgClient.query(`SELECT iso_639_1 as value, english_name as name FROM languages_tmbd`);
      return { languages: rows };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LanguagesModel(pgClient);
