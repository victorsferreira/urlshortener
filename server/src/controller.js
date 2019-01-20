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
        res.status(200).json({
          url: result
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal Server Error'
        });
      })
  }

  create(req, res, next) {
    const { url } = req.body;
    this.service.createShortUrl(url)
      .then((result) => {
        res.status(200).json({
          shortUrl: result
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal Server Error'
        });
      })
  }
}

module.exports = Controller;