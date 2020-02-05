const Phonebook = require('./phonebook.model');

const create = (req, res, next) => {
  const phonebook = new Phonebook({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  });
  phonebook
    .save()
    .then(createdContact => {
      res.status(201).json(createdContact);
    })
    .catch(e => console.log('Error in create phonebook: ', e))
};

const update = (req, res, next) => {
  Phonebook.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).then(updatedContact => {
    res.status(200).json(updatedContact);
  }).catch(e => console.log('Error in update phonebook: ', e))
};

const remove = (req, res, next) => {
  Phonebook
    .findByIdAndDelete(req.params.id)
    .then(deletedContact => {
      res.status(200).json({ message: 'Successfully deleted' })
    })
    .catch(e => console.log('Error in delete phonebook: ', e))
}

const list = (req, res, next) => {
  Phonebook.find({})
    .sort({ name: 1 })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(e => console.log('Error in get phonebook list: ', e));
}

module.exports = { create, list, update, remove };