const Phonebook = require('./phonebook.model');
const { isEmpty } = require('lodash');

const load = (req, res, next, id) => {
  Phonebook.findById(id)
    .exec()
    .then(result => {
      if (result) {
        req.contact = result;
        return next();
      }
      return res.status(400)
        .json({ message: 'No valid entry found.' })
    }).catch(err => {
      next(err);
    })
}

const create = (req, res, next) => {

  if (isEmpty(req.body.name) === true) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (isEmpty(req.body.phoneNumber) === true) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const phonebook = new Phonebook({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  });
  phonebook
    .save()
    .then(createdContact => {
      res.status(201).json(createdContact);
    })
    .catch(e => {
      console.log(e);
      next(e);
    })
};

const update = (req, res, next) => {

  if (isEmpty(req.body.name) === true) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (isEmpty(req.body.phoneNumber) === true) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const contact = req.contact;
  contact.name = req.body.name;
  contact.phoneNumber = req.body.phoneNumber;

  contact
    .save()
    .then(updatedContact => {
      res.status(200).json(updatedContact);
    })
    .catch(e => {
      console.log(e);
      next(e);
    })
  // contact.save((err, updatedContact) => {
  //   console.log(err, err)
  //   if (err) {
  //     next(err);
  //   }
  //   console.log(`updatedContact: `, updatedContact)
  //   res.stajson({
  //     message: 'Contact successfully updateded',
  //     updatedContact
  //   })
  // })
};

const remove = (req, res, next) => {

  const contact = req.contact;

  contact
    .remove()
    .then(deletedContact => {
      res.status(200).json({ message: 'Successfully deleted', deletedContact })
    })
    .catch(e => console.log('Error in delete phonebook: ', e))
}

const list = (req, res, next) => {
  Phonebook.find({})
    .sort({ name: 1 })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(e => console.log('Error in get phonebook list: ', e));
}

const search = (req, res, next) => {
  const searchingValue = req.query.phone;
  Phonebook.find({ phoneNumber: new RegExp('^' + searchingValue) }, function (err, searchedValue) {
    if (err) {
      next(err);
    }
    res.status(200).json(searchedValue);
  });
}

module.exports = { load, create, list, update, remove, search };