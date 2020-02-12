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
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          res.message = "Name is required";
          done();
        })
        .catch(done);
    });
  });
  let allEmptyPhonebook1 = {
    name: 'asdfasdf',
    phoneNumber: '01789442325'
  }
  describe('#indexof()', () => {
    it('should create a new contact info', done => {
      request(app)
        .post('/api/v1/phonebook/')
        .send(allEmptyPhonebook1)
        .expect(httpStatus.CREATED)
        .then(res => {
          allEmptyPhonebook1.phoneNumber = res.body.phoneNumber;
          done();
        })
        .catch(done);
    });
  });
});