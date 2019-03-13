const db =  require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

const express = require('express');
const apiRouter = express.Router();

/* Auxiliar functions */
const getArray = (req, res, next) => {
  const array = db.getAllFromDatabase(req.dbArray);

  req.array = array;
  next();
}
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

const addElement = (req, res, next) => {
  if (req.body) {
    const newElement = db.addToDatabase(req.dbArray, req.body);
    req.addedElement = newElement;
    res.status(201);
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
apiRouter.use('/minions', (req, res, next) => {
  req.dbArray = 'minions';
  next();
});

apiRouter.get('/minions', getArray, (req, res, next) => {
  res.send(req.array);
});

apiRouter.get('/minions/:minionId', checkElement, (req, res, next) => {
  res.send(req.element);
});

apiRouter.put('/minions/:minionId', checkElement, updateDatabase, (req, res, next) => {
  res.send(req.updatedElement);
});

apiRouter.post('/minions', addElement, (req, res, next) => {
  res.send(req.addedElement);
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
apiRouter.use('/ideas', (req, res, next) => {
  req.dbArray = 'ideas';
  next();
});

apiRouter.get('/ideas', getArray, (req, res, next) => {
  res.send(req.array);
});

apiRouter.get('/ideas/:ideaId', checkElement, (req, res, next) => {
  res.send(req.element);
});

apiRouter.put('/ideas/:ideaId', checkElement, updateDatabase, (req, res, next) => {
  res.send(req.updatedElement);
});

apiRouter.post('/ideas', checkMillionDollarIdea, addElement, (req, res, next) => {
  res.send(req.addedElement);
});

apiRouter.delete('/ideas/:ideaId', checkElement, deleteElement, (req, res, next) => {
  res.send();
});

/*/api/meetings
GET /api/meetings to get an array of all meetings.
POST /api/meetings to create a new meeting and save it to the database.
DELETE /api/meetings to delete all meetings from the database.
*/
apiRouter.use('/meetings', (req, res, next) => {
  req.dbArray = 'meetings';
  next();
});

apiRouter.get('/meetings', getArray, (req, res, next) => {
  res.send(req.array);
});

apiRouter.post('/meetings', (req, res, next) => {
  const newMeeting = db.createMeeting();
  db.addToDatabase(req.dbArray, newMeeting);
  res.status(201).send(newMeeting);
});

apiRouter.delete('/meetings', (req, res, next) => {
  db.deleteAllFromDatabase(req.dbArray);
  res.status(204).send();
});

module.exports = apiRouter;
