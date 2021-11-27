const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// const maxAge pour le cookie
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Crée un token avec l'userId et une clé et le temps max pour le cookie.
const createToken = (id) => {
  return jwt.sign({ id }, "RANDOM_TOKEN_SECRET", {
    expiresIn: maxAge,
  });
};

// Post pour créer user
module.exports.signUp = async (req, res) => {
  const fullname = req.body.fullname;
  const password = req.body.password;
  const email = req.body.email;

  // On récupere le pwd de l'user on le salt x10 et hash avec bcrypt on attend que tout soit fait et on envoie tout ca a la db.
  bcrypt.hash(password, 10).then((hash) => {
    db.query(
      "INSERT INTO test1 (email, password, fullname) VALUES (?, ?, ?);",
      [email, hash, fullname],
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

// Post pour se connecter et créer cookie avec token.
module.exports.signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM test1 WHERE email= ?;", [email], (error, results) => {
    // si erreur SQL
    if (error) {
      res.status(500).json({ error: error });

      // si email non trouvé
    } else if (results.length == 0) {
      res.status(401).json({ error: "L'email n'existe pas dans la DB" });

      // si email trouvé on compare le pwd donné et celui de la db
    } else {
      bcrypt
        .compare(password, results[0].password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: "Mot de passe incorrect!" });
          }
          // Si email et pwd ok alors on créé un cookie depuis le token.
          try {
            const token = createToken(results[0].id);
            res.cookie("jwt", token, { httpOnly: true, maxAge });
            res.status(200).json({ user: results[0].id });
          } catch (err) {
            res.status(200).json({ err });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

// Reset le cookie a "" et son maxAge a 1ms
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
