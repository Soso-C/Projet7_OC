const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");

// On vérifie si la personne a un token avec son userid valid pour pouvoir se connecter au site
module.exports = (req, res, next) => {
  try {
    // on récupere le token, on decode la clé secrete du token si = a "SECRETTOKEN" et on recupe l'user id du token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRETTOKEN);
    const userId = decodedToken.userId;
    db.query("SELECT * FROM users WHERE id= ?;", [userId], (err, user) => {
      if (!user) {
        return res.status(401).json({
          message: `User ${userId} n'existe pas`,
        });
      } else if (user[0].id !== userId) {
        return res.status(401).json({
          message: "User différent du token, connexion impossible",
        });
      }
      else {
        console.log(userId, user[0].id)
        req.user = user;
        /* On appelle le prochain middleware */
        return next();
      }
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
