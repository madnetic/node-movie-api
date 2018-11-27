import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/app';
import Movie from '../src/db/models/movie';

const { expect } = chai;

chai.use(chaiHttp);

describe('movies', () => {
    before(done => {
        Movie.deleteOne({ 'title': 'Die Hard' }, err => {
            done();
        });
    });

    describe('/POST movies', () => {        
        it('should fetch the movie data from OMDB api, save it to document store and return the full object', done => {
            chai.request(app)
                .post('/movies')
                .send({ title: 'Die Hard' })
                .end((err, res) => {
                    const { status, body } = res;
                    expect(status).to.be.eq(200);
                    expect(body).to.be.a('object');
                    expect(body.genres).to.include('Thriller');
                    expect(body).to.have.property('year', 1988);
                    done();
                });
        });

        it('should get an error on request without a title parameter', done => {
            chai.request(app)
                .post('/movies')
                .end((err, res) => {
                    expect(res.status).to.be.eq(422);
                    done();
                });
        });
    });

    describe('/GET movies', () => {
        it('should get all the movies', done => {
            chai.request(app)
                .get('/movies')
                .end((err, res) => {
                    const { status, body } = res;
                    expect(status).to.be.eq(200);
                    expect(body).to.be.a('array');
                    expect(body[0]).to.have.property('title');
                    done();
                });
        });

        it('should get all the movies tagged with "Action" genre', done => {
            chai.request(app)
                .get('/movies?genres[]=Action')
                .end((err, res) => {
                    const { status, body } = res;
                    expect(status).to.be.eq(200);
                    expect(body).to.be.a('array');
                    body.forEach(m => {
                        expect(m.genres.indexOf('Action')).to.be.gt(-1);
                    });
                    done();
                });
        });

        it('should get all the movies ordered by release date descending', done => {
            chai.request(app)
                .get('/movies?sortBy=released&sortDirection=desc')
                .end((err, res) => {
                    const { status, body } = res;
                    expect(status).to.be.eq(200);
                    expect(body).to.be.a('array');
                    const bodyCopy = [].concat(body);
                    bodyCopy.sort((a, b) => +(new Date(b.released)) - +(new Date(a.released)));
                    expect(body).to.be.deep.eq(bodyCopy);
                    done();
                });
        });
    });
});
