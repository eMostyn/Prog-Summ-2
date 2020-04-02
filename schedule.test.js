const request = require('supertest');
const app = require('./app');

describe('Test the read event request', () => {
    test('GET /readEvents succeeds', () => {
      return request(app)
	    .get('/readEvents')
	    .expect(200);
    });

    test('GET /readEvents returns JSON', () => {
        return request(app)
	    .get('/readEvents')
	    .expect('Content-type', /json/);
    });

});

describe('Test the add event request',() =>{
  test('POST add event without admin', () => {
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': false
      })
    .expect(200)
    .then(function(){
      return request(app)
      .post('/newEvent')
      .expect(403);
    })
  });
  test('POST add event with admin',() =>{
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': true
      })
    .expect(200)
    .then(function(){
      return request(app)
      .post('/newEvent')
      .send({
          'Title': "Test"
        })
      .expect(200);
    })
  });
});

describe('Test the delete event request',() =>{
  test('POST delete event without admin', () => {
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': false
      })
    .expect(200)
    .then(function(){
  return request(app)
  .post('/delEvent')
  .expect(403);
})
});
  test('POST deleteOptions event with admin',() =>{
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': true
      })
    .expect(200)
    .then(function(){
      return request(app)
      .post('/delEvent')
      .send({
          'Title': "Test"
        })
      .expect(200);
    })
  });
});

describe('Test the search event request', () => {
  test('GET search request for searching events',() =>{
  return request(app)
  .get('/searchEvents')
  .query({ 'Title': "Test" })
  .expect(200);
  });
});
