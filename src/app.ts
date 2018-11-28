import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import * as http from 'http';
import * as objectAssign from 'object-assign';
import { validationResult } from 'express-validator/check';
import Movie from './db/models/movie';
import Comment from './db/models/comment';
import postMoviesRules from './validation/rules/postMovies';
import getMoviesRules from './validation/rules/getMovies';
import postCommentsRules from './validation/rules/postComments';
import getCommentsRules from './validation/rules/getComments';
import { OMDBResponse, OMDBRating } from 'models/omdbApi';

const errorFormatter = err => err.msg;
const mapErrors = errors =>  Object.keys(errors).map(fieldName => errors[fieldName].message);

class App {
    express: express.Application;
    port: number;
    db: mongoose.Connection;

    constructor() {
        this.express = express();        
        this.port = parseInt(process.env.PORT, 10) || 3000;

        this.config();
        this.setupDB();
        this.setupRoutes();
    }

    config(): void {
        dotenv.config();
        this.express.use(bodyParser.json());
        this.express.use((err, req, res, next) => {
            next();
        });

        if (!process.env.OMDB_APIKEY) {
            console.error('OMDB APIKEY is not set');
            process.exit(1);
        }
    }

    setupDB(): void {
        this.db = mongoose.connection;

        this.db
            .on('error', () => {
                console.error('Cannot connect to the mongoDB server');
                process.exit(1);
            })
            .on('open', () => {
                console.log(`DB connection successfully initialized at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
            });

        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/omdb-api';

        mongoose.connect(uri, {
            useNewUrlParser     : true,
            reconnectTries      : Number.MAX_VALUE,
            reconnectInterval   : 1000
        });
    }

    setupRoutes(): void {
        this.express
            .get('/', this.home)
            .post('/movies', postMoviesRules, this.postMovies)
            .get('/movies', getMoviesRules, this.getMovies)
            .post('/comments', postCommentsRules, this.postComments)
            .get('/comments', getCommentsRules, this.getComments);
    }

    home(req: express.Request, res: express.Response) {
        res.send({ msg: 'Hi World' });
    }

    postMovies(req: express.Request, res: express.Response) {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }
        Movie.findOne({ title: req.body.title }, (err, movie) => {
            if (err) return res.status(500).send({ errors: ['An DB error occurred'] });
            if (!movie) {
                axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_APIKEY}&t=${req.body.title}`)
                    .then((r: AxiosResponse<OMDBResponse>) => {
                        if (r.data.Error) {
                            if (r.data.Error === 'Movie not found!') {
                                return res.status(404).send({ errors: ['Movie not found'] });
                            }
                            throw r.data.Error;
                        }

                        const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors
                              , Plot, Language, Country, Awards, Poster, Ratings, Metascore, imdbRating
                              , imdbVotes, imdbID, Type, DVD, BoxOffice, Production, Website, totalSeasons } = r.data;

                        const movie = new Movie({
                            title           : Title,
                            year            : Year          !== 'N/A' ? parseInt(Year, 10) : undefined,
                            rated           : Rated         !== 'N/A' ? Rated : undefined,
                            released        : Released      !== 'N/A' ? Released : undefined,
                            runtime         : Runtime       !== 'N/A' ? Runtime : undefined,
                            genres          : Genre         !== 'N/A' ? Genre.split(', ') : undefined,
                            directors       : Director      !== 'N/A' ? Director : undefined,
                            writers         : Writer        !== 'N/A' ? Writer.split(', ').map(w => w.replace(/ \(.+\)/, '')) : undefined,
                            actors          : Actors        !== 'N/A' ? Actors.split(', ').map(w => w.replace(/ \(.+\)/, '')) : undefined,
                            plot            : Plot          !== 'N/A' ? Plot : undefined,
                            languages       : Language      !== 'N/A' ? Language.split(', ') : undefined,
                            countries       : Country       !== 'N/A' ? Country.split(', ') : undefined,
                            awards          : Awards        !== 'N/A' ? Awards : undefined,
                            poster          : Poster        !== 'N/A' ? Poster : undefined,
                            ratings         : Ratings       !== 'N/A' ? (<OMDBRating[]>Ratings).map(r => objectAssign({}, { source: r.Source, score: r.Value })) : undefined,
                            metascore       : Metascore     !== 'N/A' ? Metascore : undefined,
                            imdbRating      : imdbRating    !== 'N/A' ? parseFloat(imdbRating) : undefined,
                            imdbVotes       : imdbVotes     !== 'N/A' ? parseInt(imdbVotes.replace(/,/g, ''), 10) : undefined,
                            imdbID          : imdbID        !== 'N/A' ? imdbID : undefined,
                            type            : Type          !== 'N/A' ? Type : undefined,
                            dvd             : DVD           !== 'N/A' ? DVD : undefined,
                            boxOffice       : BoxOffice     !== 'N/A' ? BoxOffice : undefined,
                            production      : Production    !== 'N/A' ? Production : undefined,
                            website         : Website       !== 'N/A' ? Website : undefined,
                            totalSeasons    : totalSeasons            ? parseInt(totalSeasons, 10) : undefined
                        });

                        movie.save((err, movie) => {
                            if (err) {
                                return res.status(500).send({ errors: mapErrors(err.errors) });
                            }
                            return res.send(movie);
                        });
                    }).catch(err => {
                        return res.status(500).send({ errors: ['Couldnt fetch data from OMDB api'] });
                    });
            } else {
                return res.send(movie);
            }
        });
    }

    getMovies(req: express.Request, res: express.Response) {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }

        const filterableArrayFields     = ['genres', 'directors', 'writers', 'actors', 'languages', 'countries', 'rated']
            , filterableNumberFields    = ['year', 'metascore', 'imdbRating', 'imdbVotes', 'totalSeasons']
            , filterableFields          = ['imdbID']
            , conditions                = {}
            , params                    = objectAssign(req.body, req.query)
            , page                      = parseInt(params.page, 10) || 1
            , pageSize                  = parseInt(params.pageSize, 10) || 5
            , opts                      = { limit: pageSize, skip: ((page - 1) * pageSize) };

        Object.keys(params).forEach(k => {
            if (Array.isArray(params[k]) && params[k].length) {
                if (filterableArrayFields.indexOf(k) >= 0) {
                    conditions[k] = { $in: params[k] };
                } else if (filterableNumberFields.indexOf(k) >= 0) {
                    const cond = {};
                    params[k].forEach(p => {
                        const [operator, val] = p.split(':');
                        cond[`$${operator}`] = val;
                    });
                    conditions[k] = cond;
                }
            } else if (filterableFields.indexOf(k) >= 0) {
                conditions[k] = params[k];
            }
        });

        if (params.sortBy) {
            opts['sort'] = { [params.sortBy]: params.sortDirection === 'desc' ? -1 : 1 };
        }

        Movie.find(conditions, null, opts, (err, movies) => {
            if (err) return res.status(500).send({ errors: [err] });
            return res.send(movies);
        });
    }

    postComments(req: express.Request, res: express.Response) {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }

        const comment = new Comment({
            movieId : req.body.movieId,
            content : req.body.content
        });
        comment.save((err, comment) => {
            if (err) {
                return res.status(500).send({ errors: mapErrors(err.errors) });
            }
            return res.send(comment);
        })
    }

    getComments(req: express.Request, res: express.Response) {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }

        const params    = objectAssign(req.query, req.body)
            , page      = parseInt(params.page, 10) || 1
            , pageSize  = parseInt(params.pageSize, 10) || 5
            , opts      = { limit: pageSize, skip: ((page - 1) * pageSize) };

        const conditions = params.movieId ? { movieId: params.movieId } : {};
        Comment.find(conditions, null, opts, (err, comments) => {
            if (err) return res.status(500).send({ errors: [err] });
            return res.send(comments);
        });
    }

    start(): http.Server {
        return this.express
            .listen(this.port)
            .on('listening', () => {
                console.log(`Server listening on port ${this.port}`);
            })
            .on('error', (err: NodeJS.ErrnoException) => {
                switch(err.code) {
                    case 'EACCES':
                        console.error('Privileges problem'); break;
                    case 'EADDRINUSE':
                        console.error('Port is already in use'); break;
                    default:
                        console.error('Unknown error');
                }
                process.exit(1);
            });
    }
}

const server = (new App).start();

export default server;
