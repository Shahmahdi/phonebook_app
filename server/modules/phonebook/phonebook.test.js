const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const app = require('./../../index');
const httpStatus = require('http-status');

after(done => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('Create APIs for phonebook', () => {
  let allEmptyPhonebook = {
    name: '',
    phoneNumber: ''
  }
  describe('#indexof()', () => {
    it('should not create a new contact info because of empty fields', done => {
      request(app)
        .post('/api/v1/phonebook/')
        .send(allEmptyPhonebook)
        // .expect(httpStatus[400])
        .expect({"message":"Name is required"})
        .then(res => {
          res.type = 'EmptyError';
          done();
        })
        .catch(done);
    })
  })
})