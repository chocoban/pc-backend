const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    url: process.env.DB_DEVELOPMENT_URL,
  },
  test: {
    url: process.env.DB_TEST_URL,
  },
  staging: {
    url: process.env.DB_STAGING_URL,
  },
  production: {
    url: process.env.DB_PRODUCTION_URL,
  }
};
module.exports = config;
