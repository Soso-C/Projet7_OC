const mysql = require('mysql');
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PWD = process.env.DB_PWD
const DB_DBN = process.env.DB_DBN


const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWD,
  database: DB_DBN,
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connexion a Mysql réussie !");
});


module.exports = db;


