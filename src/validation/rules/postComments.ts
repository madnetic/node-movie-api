import { checkSchema } from 'express-validator/check';
import movieExistsValidator from '../validators/movieExistsValidator';

const postCommentsRules = checkSchema({
    movieId: {
        in: ['body'],
        exists: {
            errorMessage: 'Movie ID must be provided'
        },
        isLength: {
            options: { min: 24, max: 24 },
            errorMessage: 'Movie ID must be exactly 24 characters long'
        },
        custom: movieExistsValidator
    },
    content: {
        in: ['body'],
        exists: {
            errorMessage: 'Content must be provided'
        },
        isLength: {
            options: { min: 2, max: 999 },
            errorMessage: 'Content must be between 2 and 999 characters long'
        }
    }
});

export default postCommentsRules;
