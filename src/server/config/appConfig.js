const dotenv = require('dotenv');

dotenv.config();

const {
    PORT,
    SQL_USER,
    SQL_PASSWORD,
    SQL_DATABASE,
    SQL_SERVER
}=process.env;

module.exports = {
    port: PORT,
    sql:{
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD
    }
};

