import * as Promise from 'bluebird';
import Movie from '../../db/models/movie';

const movieExistsValidator = {
    errorMessage: 'Movie with provided ID doesn\'t exist',
    options: val => {
        // Make sure schema validates length aswell!
        if (!val || val.length !== 24) return true;
        return new Promise((resolve, reject) => {
            Movie.findById(val, (err, movie) => {
                if (err) return reject();
                return resolve(movie);
            });
        }).then(() => true).catch(() => false);
    }
};

export default movieExistsValidator;
