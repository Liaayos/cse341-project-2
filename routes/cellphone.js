const routes = require('express').Router();
const cellphones = require('../controllers/cellphone.js');

routes.get('/', cellphones.findAll);
routes.get('/:cellphone_id', cellphones.findOne);
routes.put('/:cellphone_id', cellphones.update);
routes.delete('/:cellphone_id', cellphones.delete);

routes.post('/', cellphones.create);

module.exports = routes;
