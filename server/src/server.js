const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

class Server {
  constructor() {
    this.app = express();
  }

  setup(routes) {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json());    
    this.healthcheck();
    this.app.use(routes);
  }

  healthcheck() {
    this.app.get('/healthcheck', (req, res, next) => {
      res.status(200).send('Server is up and running');
    });
  }

  async connect() {
    this.app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  }
}

module.exports = new Server();