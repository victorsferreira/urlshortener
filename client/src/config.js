const { SERVER_URL, PUBLIC_URL } = process.env;

const config = {
  SERVER_URL: SERVER_URL || 'http://localhost:8090',
  PUBLIC_URL: PUBLIC_URL || 'http://localhost:3000',
};

export default config;