const request = require('supertest');
const app = require('./app');

describe('Test the read admin request', () => {
    test('GET /getAdmin succeeds', () => {
      return request(app)
	    .get('/getAdmin')
	    .expect(200);
    });

    test('GET /getAdmin returns JSON', () => {
        return request(app)
	    .get('/getAdmin')
	    .expect('Content-type', /json/);
    });

});
