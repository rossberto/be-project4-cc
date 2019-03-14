const express = require('express');
const ideasRouter = express.Router();

const aux = require('./auxiliar.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

/* /api/ideas
GET /api/ideas to get an array of all ideas.
POST /api/ideas to create a new idea and save it to the database.
GET /api/ideas/:ideaId to get a single idea by id.
PUT /api/ideas/:ideaId to update a single idea by id.
DELETE /api/ideas/:ideaId to delete a single idea by id.
*/

ideasRouter.use('/', (req, res, next) => {
  req.dbArray = 'ideas';
  next();
});

ideasRouter.get('/', aux.getArray, (req, res, next) => {
  res.send(req.array);
});

ideasRouter.get('/:ideaId', aux.checkElement, (req, res, next) => {
  res.send(req.element);
});

ideasRouter.put('/:ideaId', aux.checkElement, aux.updateDatabase, (req, res, next) => {
  res.send(req.updatedElement);
});

ideasRouter.post('/', checkMillionDollarIdea, aux.addElement, (req, res, next) => {
  res.send(req.addedElement);
});

ideasRouter.delete('/:ideaId', aux.checkElement, aux.deleteElement, (req, res, next) => {
  res.send();
});

module.exports = ideasRouter;
