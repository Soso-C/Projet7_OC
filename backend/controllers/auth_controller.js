const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const dotenv = require("dotenv");

// Post pour créer user
module.exports.signUp = async (req, res) => {
  const { fullname, password, email} = req.body;

  // On récupere le pwd de l'user on le salt x10 et hash avec bcrypt on attend que tout soit fait et on envoie tout ca a la db.
  bcrypt.hash(password, 10).then((hash) => {
    db.query(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?);",
      [fullname, email, hash],
      (err, results) => {
        if (err) {
          res.status(400).json({ err });
        } else {
          res.status(201).json({ message: "Utilisateur créé !" });
        }
      }
    );
  });
};

// Post pour se connecter et créer un token.
module.exports.signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email= ?;", [email], (error, results) => {
    // si erreur SQL
    if (error) {
      res.status(500).json({ error: error });

      // si email non trouvé
    } else if (results.length == 0) {
      res.status(401).json({ error: "Email / mot de passe incorrect !" });

      // si email trouvé on compare le pwd donné et celui de la db
    } else {
      bcrypt
        .compare(password, results[0].password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: "Email / mot de passe incorrect !" });
          }
          // Si pwd et email ok alors return une réponse 200 et on créé un token d'auth avec l'user id, la clé secrete et l'expiration dans 24h ainsi que d'autre infos user.
          else {
            res.status(200).json({
              userId: results[0].id,
              username: results[0].fullname,
              admin: results[0].isAdmin,
              token: jwt.sign(
                {
                  userId: results[0].id,
                  admin: results[0].isAdmin,
                  username: results[0].fullname,
                },
                process.env.SECRETTOKEN,
                { expiresIn: "24h" }
              ),
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

// Se Déconnecter
module.exports.logout = (req, res) => {};
