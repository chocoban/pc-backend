const dotenv = require('dotenv');

dotenv.config();

const host = process.env.PSQL_HOST;
const user = process.env.PSQL_USER;
const dbName = process.env.PSQL_DBNAME;
const password = process.env.PSQL_PASSWORD;
const port = process.env.PSQL_PORT;

const config = {
  development: {
    dialect: 'postgres',
    url: `postgres://${user}:${password}@${host}:${port}/${dbName}`
  },
  test: {
    dialect: 'postgres',
    url: `postgres://${user}:${password}@${host}:5432/${dbName}`,
  },
  staging: {
    dialect: 'postgres',
    url: `postgres://${user}:${password}@${host}:5432/${dbName}`,
  },
  production: {
    dialect: 'postgres',
    url: `postgres://${user}:${password}@${host}:5432/${dbName}`,
  }
};
module.exports = config;
