const pgClient = require('../utils/database');

class Rate {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }

  async getRateByUserIdAndMovieId({ user_id, movie_id }) {
    try {
      const { rows } = await this.pgClient.query(
        `SELECT * FROM rated_movie WHERE user_id = ${Number(user_id)} AND movie_id = ${Number(movie_id)};`
      );
      if (!rows[0] && !rows[0].id) throw { message: 'Failed rate, try later' };

      return { movie_rate: rows[0] };

    } catch (error) {
      throw error;
    }
  }

  async setRateMovieById({ user_id, movie_id, rate }) {
    try {
      const { rows } = await this.pgClient.query(
        `INSERT INTO rated_movie (movie_id, user_id, rate) VALUES (${movie_id}, ${user_id}, ${rate})  RETURNING id;`
      );

      if (!rows[0] && !rows[0].id) throw { message: 'Failed rate, try later' };

      return { movie_rate: { movie_id, user_id, rate, rate_id: rows[0].id } };

    } catch (error) {
      throw error;
    }
  }

  async updateRateMovieById({ user_id, movie_id, rate, rate_id }) {
    try {
      const { rows } = await this.pgClient.query(
        `UPDATE rated_movie SET rate=${rate} WHERE id=${rate_id} RETURNING id;`
      );

      if (!rows[0] && !rows[0].id) throw { message: 'Failed rate, try later' };

      return { movie_rate: { movie_id, user_id, rate, rate_id: rows[0].id } };

    } catch (error) {
      throw error;
    }
  }

  async deleteRateMovieById({ rate_id }) {
    try {
      await this.pgClient.query(`DELETE FROM rated_movie WHERE id=${rate_id}`);

      return null;

    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Rate(pgClient);
