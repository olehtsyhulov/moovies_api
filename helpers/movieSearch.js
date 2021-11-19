const { convertTimeForFormat } = require('./dateHelpers');
const { DEFAULT_VALUES_FOR_SEARCH } = require('../constants/deafaultValues');

const getMovieSearchParams = ({
  adult,
  budget_min,
  budget_max,
  language,
  title,
  popularity_min,
  popularity_max,
  release_date_first,
  release_date_last,
  revenue_min,
  revenue_max,
  status,
}) => {
  let searchQuery = '';

  if (adult) {
    searchQuery = `${searchQuery} AND m.adult = ${adult === 'true'}`;
  }
  if (budget_min || budget_max) {
    searchQuery = `${searchQuery} AND m.budget >= ${Number(budget_min) ||
      DEFAULT_VALUES_FOR_SEARCH.budget_min} AND m.budget <= ${Number(budget_max) ||
      DEFAULT_VALUES_FOR_SEARCH.budget_max}`;
  }
  if (language) {
    searchQuery = `${searchQuery} AND m.original_language = '${language}'`;
  }
  if (title) {
    searchQuery = `${searchQuery} AND LOWER(m.title) LIKE LOWER('%${title}%')`;
  }
  if (popularity_min || popularity_max) {
    searchQuery =
          `${searchQuery} AND m.popularity >= ${Number(popularity_min) ||
            DEFAULT_VALUES_FOR_SEARCH.popularity_min} AND m.popularity <= ${Number(popularity_max) ||
            DEFAULT_VALUES_FOR_SEARCH.popularity_max}`;
  }
  if (release_date_first || release_date_last) {
    const defaultDateToday = convertTimeForFormat();
    searchQuery = `${searchQuery} AND m.release_date >= '${release_date_first ||
      DEFAULT_VALUES_FOR_SEARCH.release_date_first}' AND m.release_date <= '${release_date_last ||
      defaultDateToday}'`;
  }
  if (revenue_min || revenue_max) {
    searchQuery = `${searchQuery} AND m.revenue >= ${Number(revenue_min) ||
      DEFAULT_VALUES_FOR_SEARCH.revenue_min} AND m.revenue <= ${Number(revenue_max) ||
      DEFAULT_VALUES_FOR_SEARCH.revenue_max}`;
  }

  if (status) {
    searchQuery = `${searchQuery} AND m.status = '${status}'`;
  }

  if (searchQuery.length) {
    searchQuery = `WHERE ${searchQuery}`.replace('AND', '');
  }
  return searchQuery;
};
const getMovieSearchSQLString1 = (conditionValue = '', startIndex, per_page) => (
  `SELECT m.*,
  count(*) OVER() as total_count,
   ARRAY_AGG(mg.genre_id) as genre_ids, ROUND(AVG(rm.rate), 1) as movie_rate
   FROM movie m
   LEFT JOIN movie_genres mg on m.id = mg.movie_id LEFT JOIN rated_movie rm on rm.movie_id = m.id ${conditionValue}
   GROUP BY m.id
   OFFSET ${startIndex} ROWS FETCH NEXT ${per_page} ROWS ONLY;
   `
);

const getMovieSearchSQLString = (conditionValue = '') => (
  `SELECT m.*, ARRAY_AGG(mg.genre_id) as genre_ids, ROUND(AVG(rm.rate), 1) as movie_rate
   FROM movie m
   LEFT JOIN movie_genres mg on m.id = mg.movie_id LEFT JOIN rated_movie rm on rm.movie_id = m.id ${conditionValue}
   GROUP BY m.id`
);

module.exports = {
  getMovieSearchParams,
  getMovieSearchSQLString,
  getMovieSearchSQLString1,
};
