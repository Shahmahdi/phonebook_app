const express = require('express');
const phonebookRoutes = require('./modules/phonebook/phonebook.route');

const router = express.Router();

router.use('/phonebook', phonebookRoutes);

module.exports = router;