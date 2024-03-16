const routes = require('express').Router();
const contacts = require('../controllers/contact.js');

routes.get('/', contacts.findAll);
routes.get('/:contact_id', contacts.findOne);
routes.put('/:contact_id', contacts.update);
routes.delete('/:contact_id', contacts.delete);
routes.post('/', contacts.create);

module.exports = routes;
