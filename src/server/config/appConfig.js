const dotenv = require("dotenv");

dotenv.config();

const {
  PORT,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
  SQL_SERVER_INSTANCE,
} = process.env;

module.exports = {
  port: PORT,
  sql: {
    host: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    instanceName: SQL_SERVER_INSTANCE,
  },
};
