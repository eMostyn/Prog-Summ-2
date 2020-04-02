const request = require('supertest');
const app = require('./app');

describe('Test the new player request',() =>{
  test('POST new player without admin', () => {
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': false
      })
    .expect(200)
    .then(function(){
      return request(app)
      .post('/newPerson')
      .expect(403);
    })
  });
  test('POST new player with admin',() =>{
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': true
      })
    .expect(200)
    .then(function(){
      return request(app)
      .post('/newPerson')
      .send({
          'Name': "Test"
        })
      .expect(200);
    })
  });
});

describe('Test the read person request',() =>{
  test('GET read person returns OK', () => {
    return request(app)
    .get('/readPerson')
    .expect(200);
  });

  test('GET read person returns JSON', () => {
      return request(app)
    .get('/readPerson')
    .expect('Content-type', /json/);
  });
});

describe('Test the delete player request',() => {
  test('POST delete player without admin', () => {
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': false
      })
    .expect(200)
    .then(function(){
  return request(app)
  .post('/delPlayer')
  .expect(403);
})
});
  test('POST delete player with admin',() =>{
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': true
      })
    .expect(200)
    .then(function(){
      return request(app)
      .post('/delPlayer')
      .send({
          'Name': "Test"
        })
      .expect(200);
    })
  });
});
