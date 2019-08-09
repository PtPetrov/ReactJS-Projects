const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', function (done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('POST /api/v1/messages', () => {
  it('response with inserted message', function (done) {
    const requestObj = {
      name: 'Pete',
      message: 'This app is so cool!',
      latitude: -90,
      longitude: 180
    };

    const responseObj = {
      ...requestObj,

    }
    request(app)
      .post('/api/v1/messages')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, responseObj, done)
  });
});