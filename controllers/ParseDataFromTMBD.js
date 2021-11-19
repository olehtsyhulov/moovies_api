require('dotenv').config();
const { getFuncForGetDataTMBD, replaceAllQuotsForDB } = require("../helpers/tmbdHelpers");

class ParseDataFromTMBD {
    constructor(pgClient) {
        this.pgClient = pgClient;
    }

   async getGenres (req, res, isNeedResponse = true) {
        try {
            const genresData = await getFuncForGetDataTMBD("/genre/movie/list");

            if (genresData.genres && genresData.genres.length) {
                const genresNames = genresData.genres.reduce((accum, curr, index) => {
                    if (index === 0) return accum + `('${curr.name}', ${curr.id})`;
                    return accum + `, ('${curr.name}', ${curr.id})`;
                }, "")

                await this.pgClient.query(`INSERT INTO genres (name, tmbd_genre_id) VALUES ${genresNames}`)
            } else {
                res.status(401).send({ message: "No Genres Find" })
            }
            if (isNeedResponse) {
               res.status(200).send({ message: 'Get Genres success' });
            }
        } catch (error) {
            res.send({ message: "Something went wrong" });
            throw error
        }
    }

    async getLanguages (req, res, isNeedResponse = true) {
        try {
            const languages = await getFuncForGetDataTMBD("/configuration/languages");

            if (languages && languages.length) {
                const languagesSqlValue = languages.reduce((accum, curr, index) => {
                    if (curr.english_name === "Chamorro") return accum;
                    if (index === 0) return accum + `('${curr.iso_639_1}', '${curr.english_name}', '${curr.name}')`;
                    return accum + `, ('${curr.iso_639_1}', '${curr.english_name}', '${curr.name}')`;
                }, "")

                await this.pgClient.query(`INSERT INTO languages_tmbd 
                                            (iso_639_1, english_name, name)
                                             VALUES ${languagesSqlValue}`)
            } else {
                res.status(401).send({ message: "No Languages Found" })
            }
            if (isNeedResponse) {
                res.status(200).send({ message: 'Get Languages success' });
            }
        } catch (error) {
            res.send({ message: "Something went wrong" });
            throw error
        }
    }

    async getFilms(req, res, isNeedResponse = true){
        try {
            for (let i = 1; i <= 5; i++) {
                const moviesByPage = await getFuncForGetDataTMBD("/movie/top_rated", { page: i });
                moviesByPage.results.forEach(async (el) => {
                    try {
                        const movie = await getFuncForGetDataTMBD(`/movie/${el.id}`);
                        const id = await this.pgClient.query(`INSERT INTO movie
                            (adult,
                             backdrop_path,
                             budget,
                             homepage,
                             imdb_id,
                             original_language,
                             original_title,
                             overview,
                             popularity,
                             poster_path,
                             release_date,
                             revenue,
                             runtime,
                             status,
                             tagline,
                             title
                             )
                             VALUES (${movie.adult || false},
                              '${movie.backdrop_path || ""}',
                              ${movie.budget || 0},
                              '${movie.homepage || ""}',
                              '${movie.imdb_id || ""}',
                              '${movie.original_language || ""}',
                              '${replaceAllQuotsForDB(movie.original_title)}',
                              '${replaceAllQuotsForDB(movie.overview)}',
                               ${movie.popularity || null},
                              '${movie.poster_path || ""}',
                              to_timestamp('${el.release_date}', 'YYYY.MM.DD'),
                              ${movie.revenue},
                              ${movie.runtime || null},
                              '${movie.status || ""}',
                              '${replaceAllQuotsForDB(movie.tagline)}',
                              '${replaceAllQuotsForDB(movie.title)}')
                              RETURNING id`);
                        if (el.genre_ids) {
                            await el.genre_ids.forEach(async el => {
                                const genreId = await this.pgClient.query(`SELECT id FROM genres WHERE tmbd_genre_id=${el}`);
                                if (genreId.rows.length) {
                                    await this.pgClient.query(`INSERT INTO movie_genres (movie_id, genre_id) VALUES (${id.rows[0].id}, ${genreId.rows[0].id})`);
                                }
                            });
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
            }
            if (isNeedResponse) {
                res.status(200).send({ message: 'Get Movie success' });
            }
        } catch (error) {
            res.send({ message: "Something went wrong" });
            throw error
        }
    }

    async getInitDataBase(req, res) {
        try {
            await this.getGenres(req, res, false);
            await this.getLanguages(req, res, false);
            await this.getFilms(req, res, false);
            res.status(200).send({ message: 'Init Success' });
        } catch (e) {
            console.log(e);
            res.send("Error");
        }
    }
}

module.exports = ParseDataFromTMBD;
