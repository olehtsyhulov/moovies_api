exports.validationForReview = ({ user_id, movie_id, content }) => {
  if (!user_id || !movie_id) return  { message: 'You need to pass user_id and movie_id' };
  if (content?.length < 2) return { message: 'Content must be at least 200 symbols' };
};
