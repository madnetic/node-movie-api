import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    movieId: {
        type        : String,
        required    : true
    },
    content: {
        type        : String,
        required    : true
    }
}, {
    versionKey      : false
});

export default model('Comment', commentSchema);
