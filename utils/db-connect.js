const mysql = require("mysql");

const dbMaterial = mysql.createConnection({
  host: "34.128.107.9",
  database: "sibi_material",
  user: "root",
  password: "capstone123",
});

const dbQuiz = mysql.createConnection({
  host: "34.128.107.9",
  database: "sibi_quiz",
  user: "root",
  password: "capstone123",
});

// const dbMaterial = mysql.createConnection({
//   host: "localhost",
//   database: "sibi_material",
//   user: "root",
//   password: "",
// });

// const dbQuiz = mysql.createConnection({
//   host: "localhost",
//   database: "sibi_quiz",
//   user: "root",
//   password: "",
// });

module.exports = {
  dbMaterial,
  dbQuiz,
};
