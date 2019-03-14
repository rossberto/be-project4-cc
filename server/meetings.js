const express = require('express');
const meetingsRouter = express.Router();

const aux = require('./auxiliar.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const db = require('./db.js');

/*/api/meetings
GET /api/meetings to get an array of all meetings.
POST /api/meetings to create a new meeting and save it to the database.
DELETE /api/meetings to delete all meetings from the database.
*/
meetingsRouter.use('/', (req, res, next) => {
  req.dbArray = 'meetings';
  next();
});

meetingsRouter.get('/', aux.getArray, (req, res, next) => {
  res.send(req.array);
});

meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = db.createMeeting();
  db.addToDatabase(req.dbArray, newMeeting);
  res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
  db.deleteAllFromDatabase(req.dbArray);
  res.status(204).send();
});

module.exports = meetingsRouter;
