const express = require("express");
const app = express();

const mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: "project7_oc",
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connexion a Mysql réussie !");
  });

const userRoute = require("./Routes/User");
app.use("/user", userRoute);


app.listen(3001, (req,res) =>{
    console.log("Le serveur est en route sur le port : 3001")
})  