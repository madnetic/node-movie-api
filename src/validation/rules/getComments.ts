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
    },
    page: {
        in: ['body', 'query'],
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: 'Page number must be higher or equal 1'
        }
    },
    pageSize: {
        in: ['body', 'query'],
        optional: true,
        isInt: {
            options: { min: 1, max: 100 },
            errorMessage: 'Page size must be between 1 and 100'
        }
    }
});

export default getCommentsRules;
