import { checkSchema } from 'express-validator/check';
import movieExistsValidator from '../validators/movieExistsValidator';

const getCommentsRules = checkSchema({
    movieId: {
        in: ['body', 'query'],
        optional: true,
        isLength: {
            options: { min: 24, max: 24 },
            errorMessage: 'Movie ID must be exactly 24 characters long'
        },
        custom: movieExistsValidator
    }
});

export default getCommentsRules;
