const { Client } = require('pg');
const config = require('./config');

class Database {
  constructor() {
    this.config = config.db;
  }

  async connect() {
    this.client = new Client(this.config);
    this.client.connect().then(() => {
      console.log(`Connected to Postgres database on port ${this.config.port}`);
    });
  }

  query(sql) {
    return this.client.query(sql);
  }
}

module.exports = new Database();