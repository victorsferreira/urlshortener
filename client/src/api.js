import config from './config';
import axios from 'axios';
console.log('config', config)

export default axios.create({
  baseURL: config.SERVER_URL
});