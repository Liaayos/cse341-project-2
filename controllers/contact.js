const db = require('../models');
const Contact = db.contacts;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({ message: 'First name can not be empty!' });
    return;
  }

  if (!req.body.lastName) {
    res.status(400).send({ message: 'Last name can not be empty!' });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({ message: 'Email can not be empty!' });
    return;
  }

  if (!req.body.cellphoneNumber) {
    res.status(400).send({ message: 'Cellphone number can not be empty!' });
    return;
  }

  if (!req.body.birthday) {
    res.status(400).send({ message: 'Birthday can not be empty!' });
    return;
  }

  if (!req.body.address) {
    res.status(400).send({ message: 'Adress can not be empty!' });
    return;
  }

  if (!req.body.isActive) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    cellphoneNumber: req.body.cellphoneNumber,
    birthday: req.body.birthday,
    address: req.body.address,
    isActive: req.body.isActive
  });
  // Save Contact in the database
  contact
    .save(contact)
    .then((data) => {
      res.send({
        message: 'Contact created with id: ' + data._id
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Contact.'
      });
    });
};

exports.findAll = (req, res) => {
  Contact.find(
    {},
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      cellphoneNumber: 1,
      birthday: 1,
      address: 1,
      isActive: 1
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving contacts.'
      });
    });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const _id = req.params.contact_id;
  Contact.find(
    { _id: _id },
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      cellphoneNumber: 1,
      birthday: 1,
      address: 1,
      isActive: 1
    }
  )
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found Contact with id ' + _id });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Contact with contact_id=' + _id
      });
    });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.contact_id;

  var contact = new Contact({});

  contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    cellphoneNumber: req.body.cellphoneNumber,
    birthday: req.body.birthday,
    address: req.body.address,
    isActive: req.body.isActive
  };
  

  Contact.findByIdAndUpdate(id, contact, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else res.send({ message: 'Contact was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Contact with id=' + id + ' ' + err
      });
    });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.contact_id;

  Contact.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({
          message: 'Contact was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Contact with id=' + id,
      });
    });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
  Contact.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Contacts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all contact.',
      });
    });
};

// Find all published Contacts
exports.findAllPublished = (req, res) => {
  Contact.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving contact.',
      });
    });
};
