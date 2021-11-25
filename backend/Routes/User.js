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
        if (err){
          res.status(400).json({ err })
        }else {
          res.status(201).json({ message: 'Utilisateur créé !' })
        }      
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
        // Si email et pwd ok alors on crée un token d'auth.
        res.status(200).json({ 
          userId: results[0].id,
          token: jwt.sign(
            { userId: results[0].id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        })
        res.send("connection réussie");
      });
    }
  });
});

module.exports = router;
