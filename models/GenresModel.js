const pgClient = require('../utils/database');

class Genres {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }

  async getAllGenres()  {
    try {
      const { rows } = await this.pgClient.query(`SELECT id, name FROM genres`);
      return { genres: rows };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Genres(pgClient);
