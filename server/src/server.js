const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const statuses = require('statuses');
const uuid = require('uuid/v4');

const config = require('./config');

class Server {
  constructor() {
    this.app = express();
  }

  setup(routes) {
    this.app.use(cors(
      { origin: 'http://localhost:3000' }
    ));

    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json());
    
    this.healthcheck();
    this.app.use(this.errorHandler.bind(this));
    this.app.use(this.createRequestId.bind(this));
    this.app.use(this.before.bind(this));
    this.app.use(this.after.bind(this));
    this.app.use(routes);
  }

  createRequestId(req, res, next) {
    const reqId = uuid();
    req.reqId = reqId;

    next();
  }

  before(req, res, next) {
    const { params, query, body, headers } = req;
    console.log(`A new request has arrived [${req.reqId}]`, { params, query, body, headers });

    next();
  }

  after(req, res, next) {
    res.on('end', () => {
      console.log(`A request has ended [${req.reqId}]`, { params, query, body, headers });
    });

    next();
  }

  errorResponse(error){
    const status = error.status || 500;
    const message = statuses[status];

    return {
      status, message
    };
  }

  errorHandler(error, req, res, next) {
    console.log('An error has occured' ,error);
    const response = this.errorResponse(error);

    res.status(response.status).json(response);
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