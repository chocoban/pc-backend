const dotenv = require('dotenv');

dotenv.config();

const host = process.env.PSQL_HOST
const user = process.env.PSQL_USER
const dbName = process.env.PSQL_DBNAME
const password = process.env.PSQL_PASSWORD

const config = {
  development: {
    url: `postgres://${user}:${password}@${host}:5432/${dbName}`
  },
  test: {
    url: `postgres://${user}:${password}@${host}:5432/${dbName}`,
  },
  staging: {
    url: `postgres://${user}:${password}@${host}:5432/${dbName}`,
  },
  production: {
    url: `postgres://${user}:${password}@${host}:5432/${dbName}`,
  }
};
module.exports = config;
