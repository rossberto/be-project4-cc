const express = require('express');
const minionsRouter = express.Router();

const aux = require('./auxiliar.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const db = require('./db.js');

/* /api/minions
POST /api/minions to create a new minion and save it to the database.
GET /api/minions/:minionId to get a single minion by id.
PUT /api/minions/:minionId to update a single minion by id.
DELETE /api/minions/:minionId to delete a single minion by id.
*/
minionsRouter.use('/', (req, res, next) => {
  req.dbArray = 'minions';
  next();
});

minionsRouter.get('/', aux.getArray, (req, res, next) => {
  res.send(req.array);
});

minionsRouter.get('/:minionId', aux.checkElement, (req, res, next) => {
  res.send(req.element);
});

minionsRouter.put('/:minionId', aux.checkElement, aux.updateDatabase, (req, res, next) => {
  res.send(req.updatedElement);
});

minionsRouter.post('/', aux.addElement, (req, res, next) => {
  res.send(req.addedElement);
});

minionsRouter.delete('/:minionId', aux.checkElement, aux.deleteElement, (req, res, next) => {
  res.send();
});

/* Bonus
GET /api/minions/:minionId/work to get an array of all work for the specified minon.
POST /api/minions/:minionId/work to create a new work object and save it to the database.
PUT /api/minions/:minionId/work/:workId to update a single work by id.
DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
*/
minionsRouter.param('minionId', (req, res, next, id) => {
  const array = db.getAllFromDatabase('work');
  const minionWork = array.filter( element => element.minionId === id);
  if (minionWork) {
    req.minionWork = minionWork;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId/work', aux.checkElement, (req, res, next) => {
  res.send(req.minionWork);
});

minionsRouter.post('/:minionId/work', aux.checkElement, (req, res, next) => {
  if (req.body) {
    console.log(req.body);
    const newWork = db.addToDatabase = ('work', req.body);
    console.log(newWork);
    res.status(201).send(newWork);
  } else {
    res.status(400).send();
  }
});

minionsRouter.put('/:minionId/work/:workId', aux.checkElement, aux.checkWork, (req, res, next) => {
  req.updatedWork = db.updateInstanceInDatabase('work', req.body);
  res.send(req.updatedWork);
});

minionsRouter.delete('/:minionId/work/:workId', aux.checkElement, aux.checkWork, (req, res, next) => {
  db.deleteFromDatabasebyId('work', req.params.workId);
  res.status(204).send();
});

module.exports = minionsRouter;
