const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const allRoutes = require('./index.route');
const mongoErrorHandler = require('./validator/mongoErrorFormat');

const app = express();

mongoose.connect(process.env.Database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected..');
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', allRoutes);
app.use(mongoErrorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server is running..');
});