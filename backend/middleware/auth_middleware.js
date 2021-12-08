const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");

// On vérifie si la personne a un token avec son userid valid pour pouvoir se connecter au site 
module.exports = (req, res, next) => {
  try { // on récupere le token, on decode la clé secrete du token si = a "SECRETTOKEN" et on recupe l'user id du token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRETTOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) { // Si l'id de notre user et son token/key est != du uid et son token/key donnée lors du login alors error.
      throw 'Invalid user ID';
    
    } else { // Si tout vas bien on next le middleware.
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};