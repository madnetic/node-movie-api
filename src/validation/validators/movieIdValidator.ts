import * as Promise from 'bluebird';
import Movie from '../../db/models/movie';
import * as mongoose from 'mongoose';

const movieExistsValidator = {
    errorMessage: 'Movie with provided ID doesn\'t exist or ID format is invalid',
    options: val => {
        if (!val) return true; // Exists validator has to be used
        if (!mongoose.Types.ObjectId.isValid(val)) return false;
        return new Promise((resolve, reject) => {
            Movie.findById(val, (err, movie) => {
                if (err) return reject();
                return resolve(movie);
            });
        }).then(() => true).catch(() => false);
    }
};

export default movieExistsValidator;
