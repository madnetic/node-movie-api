import { checkSchema } from 'express-validator/check';
import movieIdValidator from '../validators/movieIdValidator';

const getCommentsRules = checkSchema({
    movieId: {
        in: ['body', 'query'],
        optional: true,
        custom: movieIdValidator
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
