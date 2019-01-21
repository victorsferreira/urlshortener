const env = process.env.NODE_ENV || 'development';
const config = require(`./env/${env}.json`);

module.exports = config;