const { Sequelize } = require("sequelize");
const config = require("./appConfig");

const { database, user, password, host, instanceName } = config.sql;
module.exports = new Sequelize(database, user, password, {
  dialect: "mssql",
  host,
  // logging: (...msg) => console.log(`${msg[1].type} Operation`),
  logging: false,
  define: {
    freezeTableName: true,
  },
  dialectOptions: {
    options: {
      instanceName,
      encrypt: false, //false for server >v12
      trustServerCertificate: true,
      requestTimeout: 60000,
    },
  },
  pool: {
    max: 5,
    idle: 3000,
  },
});
