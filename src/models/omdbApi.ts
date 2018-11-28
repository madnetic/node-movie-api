export interface OMDBResponse {
    Title           : string;
    Year            : string;
    Rated           : string;
    Released        : string;
    Runtime         : string;
    Genre           : string;
    Director        : string;
    Writer          : string;
    Actors          : string;
    Plot            : string;
    Language        : string;
    Country         : string;
    Awards          : string;
    Poster          : string;
    Ratings         : 'N/A'|OMDBRating[];
    Metascore       : string;
    imdbRating      : string;
    imdbVotes       : string;
    imdbID          : string;
    Type            : 'N/A'|'movie'|'episode'|'series';
    DVD             : string;
    BoxOffice       : string;
    Production      : string;
    Website         : string;
    totalSeasons?   : string;
    Response        : 'True'|'False';
    Error?          : string;
}

export interface OMDBRating {
    Source  : string;
    Value   : string;
}
