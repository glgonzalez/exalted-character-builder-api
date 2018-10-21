import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/users', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/users')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should include testUser', () => {
    return chai.request(app).get('/api/v1/users')
      .then(res => {
        let testUser = res.body.find(testUser => testUser.username === 'testUser');
        expect(testUser).to.exist;
        expect(testUser).to.have.keys([
          'id',
          'email',
          'first_name',
          'last_name',
          'username',
          'password',
          'createdat',
          'updatedat'
        ]);
      });
  });
});

describe('GET api/v1/users/:id', () => {

  it('responds with single JSON object', () => {
    return chai.request(app).get('/api/v1/users/1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  it('should return test test', () => {
    return chai.request(app).get('/api/v1/users/1')
      .then(res => {
        expect(res.body.user.first_name).to.equal('test');
        expect(res.body.user.last_name).to.equal('test');
      });
  });

});