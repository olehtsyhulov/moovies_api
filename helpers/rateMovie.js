const validationForRate = ({ user_id, movie_id, rate }) => {
  if (!user_id || !movie_id) return  { message: 'You need to pass user_id and movie_id' };
  if (Number.isNaN(Number(rate)) || rate < 0 || rate > 10) return { message: 'Rate must be in range 0 - 10' };
};

module.exports = {
  validationForRate,
};
