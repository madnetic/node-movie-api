import { Schema, model } from 'mongoose';
import { Decimal128 } from 'bson';

const movieSchema = new Schema({
    title           : { type: String, required: true, index: true },
    year            : { type: Number, index: true },
    rated           : { type: String, index: true },
    released        : { type: Date, index: true },
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
    metascore       : { type: Number, index: true },
    imdbRating      : { type: Decimal128, index: true },
    imdbVotes       : { type: Number, index: true },
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
