const mysql = require("mysql2");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } = process.env;

function checkDatabaseConnection() {
  const connection = dbConnection();

  connection.connect((err) => {
    if (err) {
      console.error(
        "Error connecting to MySQL123:",
        MYSQL_HOST,
        MYSQL_USER,
        MYSQL_PASSWORD,
        MYSQL_DB,
        err
      );
      throw err;
    }

    connection.end((err) => {
      if (err) {
        console.error("Error ending the MySQL connection:", err);
        throw err;
      }
      console.log("MySQL connection successfully verified");
    });
  });
}

function dbConnection() {
  return mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB,
  });
}

module.exports = {
  checkDatabaseConnection,
  dbConnection,
};
