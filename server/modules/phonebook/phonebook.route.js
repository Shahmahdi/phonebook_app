const express = require('express');
const phonebookCtrl = require('./phonebook.controller');

const router = express.Router();

router.route('/')
  .get(phonebookCtrl.list)
  .post(phonebookCtrl.create);

router.route('/:id')
  .put(phonebookCtrl.update)
  .delete(phonebookCtrl.remove);

module.exports = router;