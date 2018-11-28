# node-movie-api
Node.js + MongoDB OMDB based movie API

## Installation steps
1. ```npm install && tsc```
2. .env configuration based on .env.example. OMDB_APIKEY has to be set. MONGODB_URI is optional, in case it isn't set defaults are used.

## Running dev server
```npm run dev```

## Building for prod
```npm run build-prod```

## Running unit tests
```npm run test```

## Live version
https://node-movie-api-1.herokuapp.com

## API documentation
Parameters marked with * are required.

### POST /movies
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;">Body Params</th>
            <td>string <strong>title</strong>*</td>
            <td>Title of movie to search for</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre class="col-6" style="max-width:730px !important;overflow:hidden !important;text-overflow:ellipsis !important;">
{
    "_id": "5bfdc240e8681b3614d6f5ca",
    "genres": ["Action", "Thriller"],
    "directors": ["John McTiernan"],
    "writers": ["Roderick Thorp", "Jeb Stuart", "Steven E. de Souza"],
    "actors": ["Bruce Willis", "Bonnie Bedelia", "Reginald VelJohnson", "Paul Gleason"],
    "languages": ["English", "German", "Italian", "Japanese"],
    "countries": ["USA"],
    "title": "Die Hard",
    "year": 1988,
    "rated": "R",
    "released": "1988-07-19T22:00:00.000Z",
    "runtime": "132 min",
    "plot": "John McClane, officer of the NYPD, tries to save his wife Holly Gennaro...",
    "awards": "Nominated for 4 Oscars. Another 7 wins & 2 nominations.",
    "poster": "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    "ratings": [
        {
            "_id": "5bfdc240e8681b3614d6f5cd", 
            "source": "Internet Movie Database", 
            "score": "8.2/10" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cc", 
            "source": "Rotten Tomatoes", 
            "score": "93%" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cb",
            "source": "Metacritic",
            "score": "70/100" 
        }
    ],
    "metascore": 70,
    "imdbRating": { "$numberDecimal": "8.2" },
    "imdbVotes": 693701,
    "imdbID": "tt0095016",
    "type": "movie",
    "dvd": "1999-03-08T23:00:00.000Z",
    "production": "20th Century Fox",
    "website": "http://www.foxhome.com/diehardcollection/index_frames.html"
}
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Movie not found"
    ]
}                     
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="3" style="vertical-align:top;text-align:right;">Error codes</th>
            <td width="300px">404 Not Found</td>
            <td>Movie does not exist in OMDB</td>
        </tr>
        <tr>
            <td>422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### GET /movies
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="16">Query/Body Params</th>
            <td>string <strong>page</strong></td>
            <td>Page number</td>
        </tr>
        <tr>
            <td>string <strong>pageSize</strong></td>
            <td>Number of results to return</td>
        </tr>
        <tr>
            <td>string <strong>sortBy</strong></td>
            <td>Possible values: 'title', 'year', 'rated', 'released', 'metascore', 'imdbRating', 'imdbVotes'</td>
        </tr>
        <tr>
            <td>string <strong>sortDirection</strong></td>
            <td>Possible values: 'asc', 'desc'</td>
        </tr>
        <tr>
            <td>array <strong>genres</strong></td>
            <td>Possible values: 'Drama', 'Romance', 'Action', 'Crime', 'Thriller', 'Adventure', 'War', 'Documentary', 'Family', 'Animation', 'Fantasy', 'Sci-Fi'</td>
        </tr>
        <tr>
            <td>array <strong>directors</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>writers</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>actors</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>languages</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>countries</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>rated</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>year</strong></td>
            <td>Array of conditions in format ```operator:value```. Possible operators: ```gt```, ```gte```, ```lt```, ```lte```, ```eq```, ```ne```.</td>
        </tr>
        <tr>
            <td>array <strong>metascore</strong></td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array <strong>imdbRating</strong></td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array <strong>imdbVotes</strong></td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array <strong>totalSeasons</strong></td>
            <td>Same as above</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
[{
    "_id": "5bfdc240e8681b3614d6f5ca",
    "genres": ["Action", "Thriller"],
    "directors": ["John McTiernan"],
    "writers": ["Roderick Thorp", "Jeb Stuart", "Steven E. de Souza"],
    "actors": ["Bruce Willis", "Bonnie Bedelia", "Reginald VelJohnson", "Paul Gleason"],
    "languages": ["English", "German", "Italian", "Japanese"],
    "countries": ["USA"],# node-movie-api
Node.js + MongoDB OMDB based movie API

## Installation steps
1. ```npm install && tsc```
2. .env configuration based on .env.example. OMDB_APIKEY has to be set. MONGODB_URI is optional, in case it isn't set defaults are used.

## Running dev server
```npm run dev```

## Building for prod
```npm run build-prod```

## Running unit tests
```npm run test```

## Live version
https://node-movie-api-1.herokuapp.com

## API documentation
Parameters marked with * are required.

### POST /movies
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;">Body Params</th>
            <td>string <strong>title</strong>*</td>
            <td>Title of movie to search for</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre class="col-6" style="max-width:730px !important;overflow:hidden !important;text-overflow:ellipsis !important;">
{
    "_id": "5bfdc240e8681b3614d6f5ca",
    "genres": ["Action", "Thriller"],
    "directors": ["John McTiernan"],
    "writers": ["Roderick Thorp", "Jeb Stuart", "Steven E. de Souza"],
    "actors": ["Bruce Willis", "Bonnie Bedelia", "Reginald VelJohnson", "Paul Gleason"],
    "languages": ["English", "German", "Italian", "Japanese"],
    "countries": ["USA"],
    "title": "Die Hard",
    "year": 1988,
    "rated": "R",
    "released": "1988-07-19T22:00:00.000Z",
    "runtime": "132 min",
    "plot": "John McClane, officer of the NYPD, tries to save his wife Holly Gennaro...",
    "awards": "Nominated for 4 Oscars. Another 7 wins & 2 nominations.",
    "poster": "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    "ratings": [
        {
            "_id": "5bfdc240e8681b3614d6f5cd", 
            "source": "Internet Movie Database", 
            "score": "8.2/10" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cc", 
            "source": "Rotten Tomatoes", 
            "score": "93%" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cb",
            "source": "Metacritic",
            "score": "70/100" 
        }
    ],
    "metascore": 70,
    "imdbRating": { "$numberDecimal": "8.2" },
    "imdbVotes": 693701,
    "imdbID": "tt0095016",
    "type": "movie",
    "dvd": "1999-03-08T23:00:00.000Z",
    "production": "20th Century Fox",
    "website": "http://www.foxhome.com/diehardcollection/index_frames.html"
}
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Movie not found"
    ]
}                     
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="3" style="vertical-align:top;text-align:right;">Error codes</th>
            <td width="300px">404 Not Found</td>
            <td>Movie does not exist in OMDB</td>
        </tr>
        <tr>
            <td>422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### GET /movies
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="16">Query/Body Params</th>
            <td>string <strong>page</strong></td>
            <td>Page number</td>
        </tr>
        <tr>
            <td>string <strong>pageSize</strong></td>
            <td>Number of results to return</td>
        </tr>
        <tr>
            <td>string <strong>sortBy</strong></td>
            <td>Possible values: 'title', 'year', 'rated', 'released', 'metascore', 'imdbRating', 'imdbVotes'</td>
        </tr>
        <tr>
            <td>string <strong>sortDirection</strong></td>
            <td>Possible values: 'asc', 'desc'</td>
        </tr>
        <tr>
            <td>array <strong>genres</strong></td>
            <td>Possible values: 'Drama', 'Romance', 'Action', 'Crime', 'Thriller', 'Adventure', 'War', 'Documentary', 'Family', 'Animation', 'Fantasy', 'Sci-Fi'</td>
        </tr>
        <tr>
            <td>array <strong>directors</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>writers</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>actors</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>languages</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>countries</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>rated</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>array <strong>year</strong></td>
            <td>Array of conditions in format ```operator:value```. Possible operators: ```gt```, ```gte```, ```lt```, ```lte```, ```eq```, ```ne```.</td>
        </tr>
        <tr>
            <td>array <strong>metascore</strong></td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array <strong>imdbRating</strong></td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array <strong>imdbVotes</strong></td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array <strong>totalSeasons</strong></td>
            <td>Same as above</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
[{
    "_id": "5bfdc240e8681b3614d6f5ca",
    "genres": ["Action", "Thriller"],
    "directors": ["John McTiernan"],
    "writers": ["Roderick Thorp", "Jeb Stuart", "Steven E. de Souza"],
    "actors": ["Bruce Willis", "Bonnie Bedelia", "Reginald VelJohnson", "Paul Gleason"],
    "languages": ["English", "German", "Italian", "Japanese"],
    "countries": ["USA"],
    "title": "Die Hard",
    "year": 1988,
    "rated": "R",
    "released": "1988-07-19T22:00:00.000Z",
    "runtime": "132 min",
    "plot": "John McClane, officer of the NYPD, tries to save his wife Holly Gennaro...",
    "awards": "Nominated for 4 Oscars. Another 7 wins & 2 nominations.",
    "poster": "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    "ratings": [
        {
            "_id": "5bfdc240e8681b3614d6f5cd", 
            "source": "Internet Movie Database", 
            "score": "8.2/10" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cc", 
            "source": "Rotten Tomatoes", 
            "score": "93%" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cb", 
            "source": "Metacritic", 
            "score": "70/100" 
        }
    ],
    "metascore": 70,
    "imdbRating": { "$numberDecimal": "8.2" },
    "imdbVotes": 693701,
    "imdbID": "tt0095016",
    "type": "movie",
    "dvd": "1999-03-08T23:00:00.000Z",
    "production": "20th Century Fox",
    "website": "http://www.foxhome.com/diehardcollection/index_frames.html"
}]
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Unknown genre"
    ]
}                    
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px;">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### POST /comments
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="2">Body Params</th>
            <td>string <strong>movieId</strong>*</td>
            <td>ID of associated movie</td>
        </tr>
        <tr>
            <td>string <strong>content</strong>*</td>
            <td>Comment body</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
{
    "_id": "5bfed8a485d7bb1d54578c00",
    "movieId": "5bfec762352eba323c9dd9cc",
    "content": "Sample comment body"
}
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Content must be provided",
        "Content must be between 2 and 999 characters long"
    ]
}                   
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### GET /comments
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="3">Query/Body Params</th>
            <td>string <strong>movieId</strong></td>
            <td>ID of associated movie</td>
        </tr>
        <tr>
            <td>string <strong>page</strong></td>
            <td>Page number</td>
        </tr>
        <tr>
            <td>string <strong>pageSize</strong></td>
            <td>Number of results to return</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
[
    {
        "_id": "5bfedb9efbd1c361883e9cde",
        "movieId": "5bfec762352eba323c9dd9cc",
        "content": "Sample comment body 1"
    },
    {
        "_id": "5bfedb9ffbd1c361883e9cdf",
        "movieId": "5bfec762352eba323c9dd9cc",
        "content": "Sample comment body 2"
    }
]
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Page size must be between 1 and 100"
    ]
}                    
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>
    "title": "Die Hard",
    "year": 1988,
    "rated": "R",
    "released": "1988-07-19T22:00:00.000Z",
    "runtime": "132 min",
    "plot": "John McClane, officer of the NYPD, tries to save his wife Holly Gennaro...",
    "awards": "Nominated for 4 Oscars. Another 7 wins & 2 nominations.",
    "poster": "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    "ratings": [
        {
            "_id": "5bfdc240e8681b3614d6f5cd", 
            "source": "Internet Movie Database", 
            "score": "8.2/10" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cc", 
            "source": "Rotten Tomatoes", 
            "score": "93%" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cb", 
            "source": "Metacritic", 
            "score": "70/100" 
        }
    ],
    "metascore": 70,
    "imdbRating": { "$numberDecimal": "8.2" },
    "imdbVotes": 693701,
    "imdbID": "tt0095016",
    "type": "movie",
    "dvd": "1999-03-08T23:00:00.000Z",
    "production": "20th Century Fox",
    "website": "http://www.foxhome.com/diehardcollection/index_frames.html"
}]
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Unknown genre"
    ]
}                    
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px;">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### POST /comments
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="2">Body Params</th>
            <td>string <strong>movieId</strong>*</td>
            <td>ID of associated movie</td>
        </tr>
        <tr>
            <td>string <strong>content</strong>*</td>
            <td>Comment body</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
{
    "_id": "5bfed8a485d7bb1d54578c00",
    "movieId": "5bfec762352eba323c9dd9cc",
    "content": "Sample comment body"
}
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Content must be provided",
        "Content must be between 2 and 999 characters long"
    ]
}                   
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### GET /comments
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="3">Query/Body Params</th>
            <td>string <strong>movieId</strong></td>
            <td>ID of associated movie</td>
        </tr>
        <tr>
            <td>string <strong>page</strong></td>
            <td>Page number</td>
        </tr>
        <tr>
            <td>string <strong>pageSize</strong></td>
            <td>Number of results to return</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
[
    {
        "_id": "5bfedb9efbd1c361883e9cde",
        "movieId": "5bfec762352eba323c9dd9cc",
        "content": "Sample comment body 1"
    },
    {
        "_id": "5bfedb9ffbd1c361883e9cdf",
        "movieId": "5bfec762352eba323c9dd9cc",
        "content": "Sample comment body 2"
    }
]
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Page size must be between 1 and 100"
    ]
}                    
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>
    "ratings": [
        {
            "_id": "5bfdc240e8681b3614d6f5cd", 
            "source": "Internet Movie Database", 
            "score": "8.2/10" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cc", 
            "source": "Rotten Tomatoes", 
            "score": "93%" 
        },
        {
            "_id": "5bfdc240e8681b3614d6f5cb",
            "source": "Metacritic",
            "score": "70/100" 
        }
    ],
    "metascore": 70,
    "imdbRating": { "$numberDecimal": "8.2" },
    "imdbVotes": 693701,
    "imdbID": "tt0095016",
    "type": "movie",
    "dvd": "1999-03-08T23:00:00.000Z",
    "production": "20th Century Fox",
    "website": "http://www.foxhome.com/diehardcollection/index_frames.html"
}
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Movie not found"
    ]
}                     
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="3" style="vertical-align:top;text-align:right;">Error codes</th>
            <td width="300px">404 Not Found</td>
            <td>Movie does not exist in OMDB</td>
        </tr>
        <tr>
            <td>422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### GET /movies
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="16">Query/Body Params</th>
            <td>string **page**</td>
            <td>Page number</td>
        </tr>
        <tr>
            <td>string <strong>pageSize**</td>
            <td>Number of results to return</td>
        </tr>
        <tr>
            <td>string **sortBy**</td>
            <td>Possible values: 'title', 'year', 'rated', 'released', 'metascore', 'imdbRating', 'imdbVotes'</td>
        </tr>
        <tr>
            <td>string **sortDirection**</td>
            <td>Possible values: 'asc', 'desc'</td>
        </tr>
        <tr>
            <td>array **genres**</td>
            <td>Possible values: 'Drama', 'Romance', 'Action', 'Crime', 'Thriller', 'Adventure', 'War', 'Documentary', 'Family', 'Animation', 'Fantasy', 'Sci-Fi'</td>
        </tr>
        <tr>
            <td>array **directors**</td>
            <td></td>
        </tr>
        <tr>
            <td>array **writers**</td>
            <td></td>
        </tr>
        <tr>
            <td>array **actors**</td>
            <td></td>
        </tr>
        <tr>
            <td>array **languages**</td>
            <td></td>
        </tr>
        <tr>
            <td>array **countries**</td>
            <td></td>
        </tr>
        <tr>
            <td>array **rated**</td>
            <td></td>
        </tr>
        <tr>
            <td>array **year**</td>
            <td>Array of conditions in format ```operator:value```. Possible operators: gt, gte, lt, lte, eq, ne.</td>
        </tr>
        <tr>
            <td>array **metascore**</td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array **imdbRating**</td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array **imdbVotes**</td>
            <td>Same as above</td>
        </tr>
        <tr>
            <td>array **totalSeasons**</td>
            <td>Same as above</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
[{
    "_id": "5bfdc240e8681b3614d6f5ca",
    "genres": ["Action", "Thriller"],
    "directors": ["John McTiernan"],
    "writers": ["Roderick Thorp", "Jeb Stuart", "Steven E. de Souza"],
    "actors": ["Bruce Willis", "Bonnie Bedelia", "Reginald VelJohnson", "Paul Gleason"],
    "languages": ["English", "German", "Italian", "Japanese"],
    "countries": ["USA"],
    "title": "Die Hard",
    "year": 1988,
    "rated": "R",
    "released": "1988-07-19T22:00:00.000Z",
    "runtime": "132 min",
    "plot": "John McClane, officer of the NYPD, tries to save his wife Holly Gennaro and several others that were taken hostage by German terrorist Hans Gruber during a Christmas party at the Nakatomi Plaza in Los Angeles.",
    "awards": "Nominated for 4 Oscars. Another 7 wins & 2 nominations.",
    "poster": "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    "ratings": [
        { "_id": "5bfdc240e8681b3614d6f5cd", "source": "Internet Movie Database", "score": "8.2/10" },
        { "_id": "5bfdc240e8681b3614d6f5cc", "source": "Rotten Tomatoes", "score": "93%" },
        { "_id": "5bfdc240e8681b3614d6f5cb", "source": "Metacritic", "score": "70/100" }
    ],
    "metascore": 70,
    "imdbRating": { "$numberDecimal": "8.2" },
    "imdbVotes": 693701,
    "imdbID": "tt0095016",
    "type": "movie",
    "dvd": "1999-03-08T23:00:00.000Z",
    "production": "20th Century Fox",
    "website": "http://www.foxhome.com/diehardcollection/index_frames.html"
}]
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Unknown genre"
    ]
}                    
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px;">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### POST /comments
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="2">Body Params</th>
            <td>string **movieId***</td>
            <td>ID of associated movie</td>
        </tr>
        <tr>
            <td>string **content***</td>
            <td>Comment body</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
{
    "_id": "5bfed8a485d7bb1d54578c00",
    "movieId": "5bfec762352eba323c9dd9cc",
    "content": "Sample comment body"
}
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Content must be provided",
        "Content must be between 2 and 999 characters long"
    ]
}                   
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>

### GET /comments
<table style="width:100%;">
    <tbody>
        <tr>
            <th style="text-align:right;width:100px;" rowspan="3">Query/Body Params</th>
            <td>string **movieId**</td>
            <td>ID of associated movie</td>
        </tr>
        <tr>
            <td>string **page**</td>
            <td>Page number</td>
        </tr>
        <tr>
            <td>string **pageSize**</td>
            <td>Number of results to return</td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;margin-right:1rem;">Sample success response</span></th>
            <td colspan="2">
                <pre style="max-width:700px;overflow:hidden;text-overflow:ellipsis;">
[
    {
        "_id": "5bfedb9efbd1c361883e9cde",
        "movieId": "5bfec762352eba323c9dd9cc",
        "content": "Sample comment body 1"
    },
    {
        "_id": "5bfedb9ffbd1c361883e9cdf",
        "movieId": "5bfec762352eba323c9dd9cc",
        "content": "Sample comment body 2"
    }
]
</pre>
            </td>
        </tr>
        <tr>
            <th style="vertical-align:top;text-align:right;">Sample error response</th>
            <td colspan="2">
                <pre>
{
    "errors": [
        "Page size must be between 1 and 100"
    ]
}                    
                </pre>
            </td>
        </tr>
        <tr>
            <th rowspan="2" style="vertical-align:top;text-align:right;">Error codes</th>
            <td style="width:300px">422 Unprocessable Entity</td>
            <td>Data did not pass validation</td>
        </tr>
        <tr>
            <td>500 Internal Server Error</td>
            <td>Other error occurred</td>
        </tr>
    </tbody>
</table>
