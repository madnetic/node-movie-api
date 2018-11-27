import { Schema, model } from 'mongoose';
import { Decimal128 } from 'bson';

const movieSchema = new Schema({
    title           : { type: String, required: true },
    year            : Number,
    rated           : String,
    released        : Date,
    runtime         : String,
    genres          : [String],
    directors       : [String],
    writers         : [String],
    actors          : [String],
    plot            : String,
    languages       : [String],
    countries       : [String],
    awards          : String,
    poster          : String,
    ratings         : [{ source: String, score: String }],
    metascore       : Number,
    imdbRating      : Decimal128,
    imdbVotes       : Number,
    imdbID          : String,
    type            : String,
    dvd             : Date,
    boxOffice       : String,
    production      : String,
    website         : String,
    totalSeasons    : Number
}, {
    versionKey      : false
});

export default model('Movie', movieSchema);
