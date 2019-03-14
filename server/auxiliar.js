const db =  require('./db.js');

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


const checkWork = (req, res, next) => {
  const reqWork = req.body;
  const currentWork = req.minionWork.find( element => element.id === req.params.workId);

  if (!currentWork) {
    res.status(400).send();
  } else {
    next();
  }
}

module.exports = {
  getArray,
  checkElement,
  updateDatabase,
  deleteElement,
  addElement,
  checkWork
};
