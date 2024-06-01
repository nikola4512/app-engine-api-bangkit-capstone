const mysql = require("mysql");

const db = mysql.createConnection({
  host: "34.128.107.9",
  database: "learning_quiz",
  user: "root",
  password: "capstone123",
});

module.exports = {
  db,
};
