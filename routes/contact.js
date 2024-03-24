const routes = require('express').Router();
const contacts = require('../controllers/contact.js');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', contacts.findAll);
routes.get('/:contact_id', contacts.findOne);
routes.put('/:contact_id', isAuthenticated, contacts.update);
routes.delete('/:contact_id', isAuthenticated, contacts.delete);
routes.post('/', isAuthenticated, contacts.create);

module.exports = routes;
