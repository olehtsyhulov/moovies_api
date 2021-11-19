const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const userRoutes = require('./routes/user');
const tmbdRoutes = require('./routes/tmbd');
const rateRoutes = require('./routes/rate');
const commentsForReviewRoutes = require('./routes/commentsForReview');
const movieRoutes = require('./routes/movie');
const genresRoutes = require('./routes/genres');
const reviewRoutes = require('./routes/review');
const langauagesRoutes = require('./routes/languages');
const routePath = require('./constants/routePath');

const app = express();


app.use(express.json());
app.use(
  routePath.swaggerRout,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc),
);
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routePath.user.user, userRoutes);
app.use(routePath.tmbd.tmbd, tmbdRoutes);
app.use(genresRoutes);
app.use(movieRoutes);
app.use(rateRoutes);
app.use(reviewRoutes);
app.use(commentsForReviewRoutes);
app.use(langauagesRoutes);

app.use((req, res) => {
  res.status(404).send('<hi>Page not found</hi>');
});

app.listen(process.env.PORT);
