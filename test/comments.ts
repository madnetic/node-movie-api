import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/app';
import Comment from '../src/db/models/comment';
import Movie from '../src/db/models/movie';

const { expect } = chai;

chai.use(chaiHttp);

describe('comments', () => {
    let movieId;

    before(done => {
        Movie.findOne({}, (err, movie) => {
            if (!movie) {
                const movieData = { title: 'Pulp Fiction' };
                chai.request(app)
                    .post('/movies')
                    .send(movieData)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        Movie.findOne(movieData, (err, movie) => {
                            movieId = movie._id.toString();
                        });
                    });
            } else {
                movieId = movie._id.toString();
                done();
            }
        });
    });

    before(done => {
        Comment.findOne({}, (err, comment) => {
            if (!comment) {
                chai.request(app)
                    .post('/comments')
                    .send({
                        movieId : movieId,
                        content : 'This is an example content'
                    })
                    .end((err, res) => {
                        done();
                    });
            } else {
                done();
            }
        });
    });

    let commentId;
    describe('/POST comments', () => {
        it('should save and return the comment', done => {
            const comment = 'Really interesting movie, thumbs up!';
            chai.request(app)
                .post('/comments')
                .send({
                    movieId : movieId,
                    content : comment
                })
                .end((err, res) => {
                    const { status, body } = res;
                    commentId = body._id.toString();
                    expect(status).to.be.eq(200);
                    expect(body).to.have.property('movieId', movieId);
                    expect(body).to.have.property('content', comment);
                    done();
                });
        });

        it('should get an error on request without valid movieId parameter', done => {
            chai.request(app)
                .post('/comments')
                .send({ movieId: 'someInvalidMovieID', content: 'The content actually doesn\'t matter' })
                .end((err, res) => {
                    expect(res.status).to.be.not.eq(200);
                    done();
                });
        });
    });

    describe('/GET comments', () => {
        it('should get all the comments', done => {
            chai.request(app)
                .get('/comments')
                .end((err, res) => {
                    const { status, body } = res;
                    expect(status).to.be.eq(200);
                    expect(body).to.be.a('array');
                    expect(body[0]).to.have.property('movieId');
                    expect(body[0]).to.have.property('content');
                    done();
                });
        });

        it('should get comments for specific movie', done => {
            chai.request(app)
                .get('/comments')
                .send({ movieId: movieId })
                .end((err, res) => {
                    const { status, body } = res;
                    expect(status).to.be.eq(200);
                    expect(body).to.be.a('array');
                    expect(body[0]).to.have.property('movieId');
                    expect(body[0]).to.have.property('content');
                    body.forEach(comment => {
                        expect(comment.movieId).to.be.eq(movieId);
                    });
                    done();
                });
        });

        it('should get an error on request without valid movieId parameter', done => {
            chai.request(app)
                .get('/comments')
                .send({ movieId: 'someInvalidMovieID' })
                .end((err, res) => {
                    expect(res.status).to.be.not.eq(200);
                    done();
                });
        });
    });

    after(done => {
        Comment.findByIdAndDelete(commentId, (err, res) => {
            done();
        });
    });
});
