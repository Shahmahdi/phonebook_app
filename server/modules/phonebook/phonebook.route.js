const express = require('express');
const phonebookCtrl = require('./phonebook.controller');

const router = express.Router();

router.route('/')
  .get(phonebookCtrl.list)
  .post(phonebookCtrl.create);

router.route('/:id')
  .put(phonebookCtrl.update)
  .delete(phonebookCtrl.remove);

router.route('/search')
  .get(phonebookCtrl.search);

router.param('id', phonebookCtrl.load);

module.exports = router;