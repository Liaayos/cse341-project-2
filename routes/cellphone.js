const routes = require('express').Router();
const cellphones = require('../controllers/cellphone.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

routes.get('/', cellphones.findAll);
routes.get('/:cellphone_id', cellphones.findOne);
routes.put('/:cellphone_id', isAuthenticated, cellphones.update);
routes.delete('/:cellphone_id', isAuthenticated, cellphones.delete);

routes.post('/', isAuthenticated, cellphones.create);

module.exports = routes;
