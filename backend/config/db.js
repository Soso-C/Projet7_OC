const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: "project7_oc",
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connexion a Mysql réussie !");
});


module.exports = db;


