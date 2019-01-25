const Service = require('./service');
const database = require('./db');

class Controller {
  constructor() {
    this.service = new Service();
    this.database = database;
  }

  index(req, res, next) {
    const { code } = req.params;

    this.service.findUrl(code)
      .then((result) => {
        console.log('Finished loading an URL');

        res.status(200).json(result);
      })
      .catch((error) => {
        next(error);
      })
  }

  create(req, res, next) {
    const { url } = req.body;
    this.service.createShortUrl(url)
      .then((result) => {
        console.log('Finished creating a short URL');

        res.status(200).json(result);
      })
      .catch((error) => {
        next(error);
      })
  }
}

module.exports = Controller;