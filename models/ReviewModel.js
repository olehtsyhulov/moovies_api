const { convertTimeForFormat } = require('../helpers/dateHelpers');
const pgClient = require('../utils/database');

class Review {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }
  async getReview(searchQuery) {
    try {
      const { rows } = await this.pgClient.query(`
        SELECT rev.*, u.first_name, u.last_name
        FROM review rev 
        LEFT JOIN users u on rev.user_id = u.id ${searchQuery};
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  async getReviewById({ movie_id }) {
    try {
      const review = await this.getReview(`WHERE movie_id='${movie_id}' ORDER BY created_at`);
      return { review };
    } catch (error) {
      throw error;
    }
  }

  async createReview({ user_id, movie_id, content }) {
    try {
      const { rows: response } = await this.pgClient.query(`
      INSERT INTO review (movie_id, user_id, content, created_at)
       VALUES (${movie_id}, ${user_id}, '${content}', '${convertTimeForFormat()}') RETURNING id;`
      );
      if (response[0]?.id) {
        const review = await this.getReview(`WHERE rev.id=${response[0]?.id}`);
        return { review };
      }
    } catch (error) {
      throw error;
    }
  }
  async updateReviewById({ user_id, movie_id, content, review_id }) {
    try {
      const { rows } = await this.pgClient.query(
        `UPDATE review SET content='${content}', updated_at='${convertTimeForFormat()}'
            WHERE id='${review_id}' RETURNING id;`
      );

      if (!rows[0] && !rows[0].id) throw { message: 'Something went wrong try later' };

      return { review: { movie_id, user_id, content, rate_id: rows[0]?.id } };

    } catch (error) {
      throw error;
    }
  }
  async deleteReviewById({ review_id }) {
    try {
      await this.pgClient.query(`DELETE FROM review WHERE id=${review_id}`);

      return null;

    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Review(pgClient);
