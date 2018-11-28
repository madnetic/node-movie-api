import { checkSchema } from 'express-validator/check';
import movieIdValidator from '../validators/movieIdValidator';

const postCommentsRules = checkSchema({
    movieId: {
        in: ['body'],
        exists: {
            errorMessage: 'Movie ID must be provided'
        },
        custom: movieIdValidator
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
