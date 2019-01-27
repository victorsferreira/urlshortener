const { REACT_APP_SERVER_URL, REACT_APP_PUBLIC_URL } = process.env;

const config = {
  SERVER_URL: REACT_APP_SERVER_URL || 'http://localhost:8090',
  PUBLIC_URL: REACT_APP_PUBLIC_URL || 'http://localhost:3000/#',
};

export default config;