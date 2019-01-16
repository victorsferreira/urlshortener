const Service = require('./service');
const database = require('./db');

class Controller {
  constructor(){
    this.service = new Service();
    this.database = database;
  }

  index(req, res, next) {
    database.query('SELECT NOW()').then((now) => {
      console.log('now', now)
    })

    res.send('index');
  }

  create(req, res, next) {
    res.send('create');
  }
}

module.exports = Controller;