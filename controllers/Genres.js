const { stringValidation } = require("../helpers/validation");
const Genres = require("../models/GenresModel");

class GenresController {
    constructor(pgClient) {
        this.pgClient = pgClient;
    }

    async getGenres(_, res){
        try {
            const genres = await Genres.getAllGenres();
            res.status(200).send(genres);
        } catch (error) {
            console.log(error)
            res.send({ message: "Something went wrong" });
        }
    }

   async setGenres(req, res) {
        try {
            //add validation for user role and active role
            const { names } = req.body;
            if (names && names.length) {
                const namesValue = names.reduce((accum, curr, index) => {
                    if (index === 0) return accum + `('${curr}')`;
                    return accum + `, ('${curr}')`;
                }, "")
                await this.pgClient.query(`INSERT INTO genres (name) VALUES ${namesValue}`);
                const genres = await getAllGenres();
                res.status(200).send(genres);
            } else {
                res.status().send({ message: "Parameter name is not only word" })
            }
        } catch (error) {
            console.log(error)
            res.status(402).send({ message: "Something went wrong" });
        }
    }

    async updateGenre (req, res) {
        try {
            //add validation for user role and active role
            const { name, id } = req.body;
            if (id && stringValidation(name)) {
                await this.pgClient.query(`UPDATE genres SET name='${name}' WHERE id=${id}`);
                const genres = await getAllGenres();
                res.status(200).send(genres);
            } else {
                res.status().send({ message: "Parameter name is not only word or hasn\'t id" })
            }
        } catch (error) {
            res.status(402).send({ message: "Something went wrong" });
        }
    }

   async deleteGenre (req, res) {
        try {
            const { id } = req.body;
            if (id && Number(id)) {
                await this.pgClient.query(`DELETE FROM genres WHERE id=${id}`);
                const genres = await getAllGenres();
                res.status(200).send(genres);
            } else {
                res.status(402).send({ message: "Parameter name is not only word or hasn\'t id" })
            }
        } catch (error) {
            res.status(402).send({ message: "Something went wrong" });
        }
    }
}

module.exports = GenresController;
