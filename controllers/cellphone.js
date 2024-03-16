const db = require('../models');
const Cellphone = db.cellphones;

exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.brand) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Cellphone
  const cellphone = new Cellphone({
    brand: req.body.brand,
    model: req.body.model,
    series: req.body.series
  });
  // Save Cellphone in the database
  cellphone
    .save(cellphone)
    .then((data) => {
      res.send({
        message: 'Cellphone created with id: ' + data._id
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Cellphone.'
      });
    });
};

exports.findAll = (req, res) => {
  Cellphone.find(
    {},
    {
      brand: 1,
      model: 1,
      series: 1
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving cellphones.'
      });
    });
};

// Find a single Cellphone with an id
exports.findOne = (req, res) => {
  const _id = req.params.cellphone_id;
  Cellphone.find(
    { _id: _id },
    {
        brand: 1,
        model: 1,
        series: 1
    }
  )
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found Cellphone with id ' + _id });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Cellphone with cellphone_id=' + _id
      });
    });
};

// Update a Cellphone by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.cellphone_id;

  Cellphone.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cellphone with id=${id}. Maybe Cellphone was not found!`,
        });
      } else res.send({ message: 'Cellphone was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Cellphone with id=' + id,
      });
    });
};

// Delete a Cellphone with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.cellphone_id;
console.log(id)
  Cellphone.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cellphone with id=${id}. Maybe Cellphone was not found!`,
        });
      } else {
        res.send({
          message: 'Cellphone was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Cellphone with id=' + id,
      });
    });
};

// Delete all Cellphones from the database.
exports.deleteAll = (req, res) => {
  Cellphone.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Cellphones were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all cellphone.',
      });
    });
};

// Find all published Cellphones
exports.findAllPublished = (req, res) => {
  Cellphone.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving cellphone.',
      });
    });
};
