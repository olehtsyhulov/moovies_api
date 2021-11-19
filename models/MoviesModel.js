const pgClient = require('../utils/database');
const { getMovieSearchSQLString, getMovieSearchSQLString1 } = require('../helpers/movieSearch');

class Movies {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }

  async getMoviesModal(searchQuery, page = 1, per_page = 20) {
    try {
      const startIndex = (page - 1) * per_page;
      const { rows } = await this.pgClient.query(getMovieSearchSQLString1(searchQuery, startIndex, per_page));
      return {
        totalCount: rows[0] ? Number(rows[0].total_count) : 0,
        movies: rows.map(item => {
          delete item.total_count;
          return item;
        }),
        currentPage: Number(page),
      };
    } catch (error) {
      throw error;
    }
  }

  async getMoviesByIdModal(id) {
    try {
      const { rows } = await this.pgClient.query(getMovieSearchSQLString(`WHERE m.id = ${id}`));
      return { movie: rows[0] };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Movies(pgClient);
