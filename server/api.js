const db =  require('./db.js');

const express = require('express');
const apiRouter = express.Router();

/* Auxiliar functions */
const checkElement = (req, res, next) => {
  let element;
  if (req.params.minionId) {
    element = db.getFromDatabaseById(req.dbArray, req.params.minionId);
  } else if (req.params.ideaId) {
    element = db.getFromDatabaseById(req.dbArray, req.params.ideaId);
  }

  if (element) {
    req.element = element;
    next();
  } else {
    res.status(404).send();
  }
}

const updateDatabase = (req, res, next) => {
  const updatedElement = db.updateInstanceInDatabase(req.dbArray, req.body);
  req.updatedElement = updatedElement;
  next();
}

const deleteElement = (req, res, next) => {
  if ( db.deleteFromDatabasebyId(req.dbArray, req.element.id) ) {
    res.status(204);
  } else {
    res.status(400);
  }
  next();
}
/* End of auxiliar functions */

/* /api/minions
POST /api/minions to create a new minion and save it to the database.
GET /api/minions/:minionId to get a single minion by id.
PUT /api/minions/:minionId to update a single minion by id.
DELETE /api/minions/:minionId to delete a single minion by id.
*/

apiRouter.get('/minions', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.send(minions);
});


apiRouter.param('minionId', (req, res, next, id) => {
  req.dbArray = 'minions';
  next();
});

apiRouter.get('/minions/:minionId', checkElement, (req, res, next) => {
  res.send(req.element);
});

apiRouter.put('/minions/:minionId', checkElement, updateDatabase, (req, res, next) => {
  res.send(req.updatedElement);
});

apiRouter.post('/minions', (req, res, next) => {
  if (req.body) {
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
  }
});

apiRouter.delete('/minions/:minionId', checkElement, deleteElement, (req, res, next) => {
  res.send();
});

/* /api/ideas
GET /api/ideas to get an array of all ideas.
POST /api/ideas to create a new idea and save it to the database.
GET /api/ideas/:ideaId to get a single idea by id.
PUT /api/ideas/:ideaId to update a single idea by id.
DELETE /api/ideas/:ideaId to delete a single idea by id.
*/

apiRouter.get('/ideas', (req, res, next) => {
  const minions = db.getAllFromDatabase('ideas');
  res.send(minions);
});


apiRouter.param('ideaId', (req, res, next, id) => {
  req.dbArray = 'ideas';
  next();
});

apiRouter.get('/ideas/:ideaId', checkElement, (req, res, next) => {
  res.send(req.element);
});

apiRouter.put('/ideas/:ideaId', checkElement, updateDatabase, (req, res, next) => {
  res.send(req.updatedElement);
});

apiRouter.post('/ideas', (req, res, next) => {
  if (req.body) {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
  }
});

apiRouter.delete('/ideas/:ideaId', checkElement, deleteElement, (req, res, next) => {
  res.send();
});


module.exports = apiRouter;
