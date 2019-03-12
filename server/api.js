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
/* End of auxiliar functions */

apiRouter.get('/minions', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.send(minions);
});

apiRouter.post('/minions', (req, res, next) => {
  if (req.body) {
    const newMinion = db.addToDatabase('minions', req.body);
    res.send(newMinion);
  }
});

apiRouter.get('/minions/:minionId', checkMinion, (req, res, next) => {
  res.send(req.minion);
});

apiRouter.put('/minions/:minionId', checkMinion, (req, res, next) => {
  const updatedMInion = db.updateInstanceInDatabase('minions', req.body);
  res.send(updatedMInion);
});
/*
POST /api/minions to create a new minion and save it to the database.
GET /api/minions/:minionId to get a single minion by id.
PUT /api/minions/:minionId to update a single minion by id.
DELETE /api/minions/:minionId to delete a single minion by id.
*/

module.exports = apiRouter;
