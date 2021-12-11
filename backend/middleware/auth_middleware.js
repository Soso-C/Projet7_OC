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

    // On compare l'user id du token si il existe dans notre db 
    db.query("SELECT id FROM users WHERE id= ?;", [userId], (err, user) => {

      // Si ya pas d'user alors on return l'id du token et on dit que l'user existe pas
      if (!user) {
        return res.status(401).json({
          message: `User ${userId} n'existe pas`,
        });
      }
      // Sinon si ok alors on passe au middleware suivant
      else {
        console.log(userId, user[0].id)
        req.user = user;
        return next();
      }
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
