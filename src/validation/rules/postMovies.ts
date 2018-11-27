import { checkSchema } from 'express-validator/check';

const postMoviesRules = checkSchema({
    title: {
        in: ['body'],
        exists: {
            errorMessage: 'Title must be provided'
        },
        isLength: {
            errorMessage: 'Title must be between 2 and 99 characters long',
            options: { min: 2, max: 99 }
        }
    }
});

export default postMoviesRules;
