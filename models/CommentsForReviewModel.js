const pgClient = require('../utils/database');
const { convertTimeForFormat } = require('../helpers/dateHelpers');


class CommentsForReviewModel {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }

  async getCommentsByReviewId({ review_id }) {
    try {
      const { rows } = await this.pgClient.query(
        `SELECT rc.*, u.first_name, u.last_name FROM review_comments rc
            LEFT JOIN users u on rc.user_id = u.id
            WHERE rc.review_id = ${Number(review_id)};`
      );

      return { comments: rows };

    } catch (error) {
      throw error;
    }
  }

  async createCommentForReview({ user_id, review_id, content }) {
    try {
      const { rows } = await this.pgClient.query(
        `INSERT INTO review_comments (review_id, user_id, content, created_at) 
            VALUES (${review_id}, ${user_id}, '${content}', '${convertTimeForFormat()}')  RETURNING id;`
      );
      if (!rows[0] && !rows[0].id) throw { message: 'Creating of comments is failed' };

      return await this.getCommentsByReviewId({ review_id });
    } catch (error) {
      throw error;
    }
  }

  async updateCommentsForReview({ comment_id, content, review_id }) {
    try {
      const { rows } = await this.pgClient.query(
        `UPDATE review_comments SET content='${content}', updated_at='${convertTimeForFormat()}'
            WHERE id=${comment_id} RETURNING id;`
      );

      if (!rows[0] && !rows[0].id) throw { message: 'Updating of comments is failed' };

      return await this.getCommentsByReviewId({ review_id });
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentsForReview({ comment_id, review_id }) {
    try {
      await this.pgClient.query(`DELETE FROM review_comments WHERE id=${comment_id}`);

      return await this.getCommentsByReviewId({ review_id });
    } catch (error) {
      throw error;
    }
  }

  async deleteAllCommentsForReviewByReviewId({ review_id }) {
    try {
      await this.pgClient.query(`DELETE FROM review_comments WHERE review_id=${review_id}`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CommentsForReviewModel(pgClient);
