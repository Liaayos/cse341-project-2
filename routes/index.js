const routes = require('express').Router();
const contact = require('./contact');
const cellphone = require('./cellphone');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const passport = require('passport');


routes.use('/api-docs', swaggerUi.serve);
routes.use('/contacts', contact);
routes.use('/cellphones', cellphone);

routes.get('/api-docs', swaggerUi.setup(swaggerDocument));
routes.get('/login', passport.authenticate('github'), (req, res) => {});
routes.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err){return next(err); }
    res.redirect('/');
  });
});

module.exports = routes;
