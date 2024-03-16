const routes = require('express').Router();
const contact = require('./contact');
const cellphone = require('./cellphone');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');


routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));
routes.use('/contacts', contact);
routes.use('/cellphones', cellphone);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;
