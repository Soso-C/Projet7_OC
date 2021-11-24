const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

// Post pour créer user
router.post("/signup", (req, res) => {
  const fullname = req.body.fullname;
  const password = req.body.password;
  const email = req.body.email;

  // On récupere le pwd de l'user on le salt x10 et hash avec bcrypt on attend que tout soit fait et on envoie tout ca a la db.
  bcrypt.hash(password, 10).then((hash) => {
    db.query(
      "INSERT INTO test1 (email, password, fullname) VALUES (?, ?, ?);",
      [email, hash, fullname],
      (err, results) => {
        console.log(err);
        res.send(results);
      }
    );
  });
});

// Post login user
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM test1 WHERE email= ?;", [email], (error, results) => {
    // si erreur SQL
    if (error) {
      res.status(500).json({ error: error });

      // si email non trouvé
    } else if (results.length == 0) {
      res.status(401).json({ error: "L'email n'existe pas dans la DB" });

      // si email trouvé on test pwd
    } else {
      bcrypt.compare(password, results[0].password).then((valid) => {
        if (!valid) {
          res.status(401).json({ error: "Mot de passe incorrect!" });
        }

        res.send("connection réussie");
      });
    }
  });
});

module.exports = router;
