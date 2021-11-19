CREATE TABLE "movie" (
	id SERIAL PRIMARY KEY,
	adult BOOLEAN NOT NULL,
	backdrop_path VARCHAR(255) NOT NULL,
	budget INTEGER NULL,
	homepage VARCHAR(255) NULL,
	imdb_id VARCHAR(255) NULL,
	original_language VARCHAR(255) NOT NULL,
	original_title VARCHAR(255) NOT NULL,
	overview VARCHAR(10000) NULL,
	popularity FLOAT NOT NULL,
	poster_path VARCHAR(255) NOT NULL,
	release_date TIMESTAMP NOT NULL,
	revenue INTEGER NULL,
	runtime INTEGER NULL,
	status VARCHAR(255) NOT NULL,
	tagline VARCHAR(255) NULL,
	title VARCHAR(255) NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "genres" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	tmbd_genre_id integer NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users" (
	id SERIAL PRIMARY KEY,
	login VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	avatar BYTEA NULL,
	token VARCHAR(255) NULL,
	role VARCHAR(255) NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "movie_genres" (
    id SERIAL PRIMARY KEY,
    movie_id integer NOT NULL,
    genre_id integer NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE "review" (
	id SERIAL PRIMARY KEY,
	created_at DATE NOT NULL,
	updated_at DATE,
	content VARCHAR(255) NOT NULL,
	movie_id integer NOT NULL,
	user_id integer NOT NULL,
	FOREIGN KEY (movie_id) REFERENCES movie(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE "rated_movie" (
	id SERIAL PRIMARY KEY,
	movie_id integer NOT NULL,
	user_id integer NOT NULL,
	rate integer NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE "review_comments" (
	id SERIAL PRIMARY KEY,
	review_id integer NOT NULL,
	created_at DATE NOT NULL,
    updated_at DATE,
	user_id integer NOT NULL,
	content VARCHAR(255) NOT NULL,
    FOREIGN KEY (review_id) REFERENCES review(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE "languages_tmbd" (
	id SERIAL PRIMARY KEY,
	iso_639_1 VARCHAR(255) NOT NULL,
	english_name VARCHAR(255) NOT NULL,
	name VARCHAR(255) NULL
) WITH (
  OIDS=FALSE
);

INSERT INTO users (login, first_name, last_name, password, role) VALUES ('Max', 'Max', 'Sh', 'password', 'admin');
