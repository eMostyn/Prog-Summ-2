const request = require('supertest');
const app = require('./app');

describe('Test the ammend appearances request', () => {
  test('POST new appearances data without admin', () => {
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': false
      })
    .expect(200)
    .then(function(){
      return request(app)
      .post('/ammendApps')
      .expect(403);
    })
});
test('POST new appearances data with admin', () => {
  return request(app)
  .post('/adminToggle')
  .send({
      'Admin': true
    })
  .expect(200)
  .then(function(){
    return request(app)
    .post('/ammendApps')
    .send({
        'Title': "Test",
        'Apps': 10
      })
    .expect(200);
  })
});
});

describe('Test the ammend goals request', () => {
  test('POST new goals data without admin', () => {
    return request(app)
    .post('/adminToggle')
    .send({
        'Admin': false
      })
    .expect(200)
    .then(function(){
      return request(app)
      .post('/ammendGoals')
      .send({
          'Title': "Test",
          'Goals': 10
        })
      .expect(403);
    })
});
test('POST new goals data with admin', () => {
  return request(app)
  .post('/adminToggle')
  .send({
      'Admin': true
    })
  .expect(200)
  .then(function(){
    return request(app)
    .post('/ammendGoals')
    .send({
        'Title': "Test",
        'Goals': 10
      })
    .expect(200);
  })
});
});
