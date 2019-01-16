const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const server = require('./server');
const routes = require('./routes');
const database = require('./db');

server.setup(routes);
server.connect().then(()=>{
  return database.connect();
});