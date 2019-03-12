const db =  require('./db.js');

const express = require('express');
const apiRouter = express.Router();

/* Auxiliar functions */
const checkMinion = (req, res, next) => {
  const minionId = Number(req.params.minionId);
  const minion = db.getFromDatabaseById('minions', req.params.minionId);

  if (minion) {
    req.minion = minion;
    req.minionId = minionId;
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
/* End of auxiliar functions */

/*
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

apiRouter.get('/minions/:minionId', checkMinion, (req, res, next) => {
  res.send(req.minion);
});

apiRouter.put('/minions/:minionId', checkMinion, updateDatabase, (req, res, next) => {
  res.send(req.updatedElement);
});

apiRouter.post('/minions', (req, res, next) => {
  if (req.body) {
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
  }
});

apiRouter.delete('/minions/:minionId', checkMinion, (req, res, next) => {
  if ( db.deleteFromDatabasebyId('minions', req.minion.id) ) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});


module.exports = apiRouter;
