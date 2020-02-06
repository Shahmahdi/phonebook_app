const mongoose = require('mongoose');

const PhonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Phonebook', PhonebookSchema);

