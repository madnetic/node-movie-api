import { checkSchema } from 'express-validator/check';

const getFilterableNumberFieldErrorMessage = 
        fieldName => `${fieldName} conditions has to be in format operator:value. Possible operators: lt, lte, gt, gte, eq, ne.`
    
    , filterableNumberFieldRegex = /^(lt|lte|gt|gte|eq|ne):[0-9]+(\.[0-9]+)?$/;

const getMoviesRules = checkSchema({
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
    },
    sortBy: {
        in: ['body', 'query'],
        optional: true,
        isIn: {
            options: [['title', 'year', 'rated', 'released', 'metascore', 'imdbRating', 'imdbVotes']],
            errorMessage: 'Unsupported sort field'
        }
    },
    sortDirection: {
        in: ['body', 'query'],
        optional: true,
        isIn: {
            options: [['asc', 'desc']],
            errorMessage: 'Invalid sort direction'
        }
    },
    genres: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Genres has to be an array'
        }
    },
    'genres.*': {
        in: ['body', 'query'],
        isIn: {
            options: [[
                'Drama', 'Romance', 'Action', 'Crime', 'Thriller', 'Adventure', 'War', 'Documentary', 'Family', 'Animation', 
                'Fantasy', 'Sci-Fi'
            ]],
            errorMessage: 'Unknown genre'
        }
    },
    directors: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Directors has to be an array'
        }
    },
    'directors.*': {
        in: ['body', 'query'],
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'Director names must be between 2 and 50 characters long'
        }
    },
    writers: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Writers has to be an array'
        }
    },
    'writers.*': {
        in: ['body', 'query'],
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'Writer names must be between 2 and 50 characters long'
        }
    },
    actors: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Actors has to be an array'
        }
    },
    'actors.*': {
        in: ['body', 'query'],
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'Actor names must be between 2 and 50 characters long'
        }
    },
    languages: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Languages has to be an array'
        }
    },
    'languages.*': {
        in: ['body', 'query'],
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'Language names must be between 2 and 50 characters long'
        }
    },
    countries: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Countries has to be an array'
        }
    },
    'countries.*': {
        in: ['body', 'query'],
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'Country names must be between 2 and 50 characters long'
        }
    },
    rated: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Rated has to be an array'
        }
    },
    'rated.*': {
        in: ['body', 'query'],
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'Rating names must be between 2 and 50 characters long'
        }
    },
    year: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Year has to be an array'
        }
    },
    'year.*': {
        in: ['body', 'query'],
        matches: {
            errorMessage: getFilterableNumberFieldErrorMessage('year'),
            options: [filterableNumberFieldRegex] 
        }
    },
    metascore: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'Metascore has to be an array'
        }
    },
    'metascore.*': {
        in: ['body', 'query'],
        matches: {
            errorMessage: getFilterableNumberFieldErrorMessage('metascore'),
            options: [filterableNumberFieldRegex] 
        }
    },
    imdbRating: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'imdbRating has to be an array'
        }
    },
    'imdbRating.*': {
        in: ['body', 'query'],
        matches: {
            errorMessage: getFilterableNumberFieldErrorMessage('imdbRating'),
            options: [filterableNumberFieldRegex] 
        }
    },
    imdbVotes: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'imdbVotes has to be an array'
        }
    },
    'imdbVotes.*': {
        in: ['body', 'query'],
        matches: {
            errorMessage: getFilterableNumberFieldErrorMessage('imdbVotes'),
            options: [filterableNumberFieldRegex] 
        }
    },
    totalSeasons: {
        in: ['body', 'query'],
        optional: true,
        isArray: {
            errorMessage: 'totalSeasons has to be an array'
        }
    },
    'totalSeasons.*': {
        in: ['body', 'query'],
        matches: {
            errorMessage: getFilterableNumberFieldErrorMessage('totalSeasons'),
            options: [filterableNumberFieldRegex] 
        }
    },
});

export default getMoviesRules;
