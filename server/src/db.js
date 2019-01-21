const { Client } = require('pg');
const config = require('./config');
const { waitOn } = require('./helpers');

class Database {
  constructor() {
    this.config = config.db;
    this.client = null;
  }

  connect() {
    this.client = new Client(this.config);
    return this.client.connect()
      .then(() => {
        console.log(`Connected to Postgres database on host ${this.config.host} and on port ${this.config.port}`);

        return true;
      })
      .catch(async (error) => {
        this.client.end();
        const waitMiliseconds = 2000;

        console.log(`
          Couldn't connect to Postgres database on host ${this.config.host} and port ${this.config.port}. 
          Will retry in ${waitMiliseconds / 1000} seconds
        `,
          error,
          this.config);

        await waitOn(waitMiliseconds);
        
        return this.connect();
      })
  }

  query(sql) {
    return this.client.query(sql);
  }
}

module.exports = new Database();