const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")


module.exports = (req, res, next) => {

    // récupe le token dans les paramètres
    const authHeader = req.headers.authorization;

    // Si l'user a une autorisation alors on verify le token et sa clé secrete.
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRETTOKEN, (err, user) => {
            if (err) {
                res.status(403).json({ error: "token non valide"});
            } else {
                next();
            }
        });
    }
    // sinon renvoie 401 non authorisé : msg ....
    else {
        res.status(401).json({ error:"Acces non authorisé, présentez un token valide pour faire cette requete" });
    }
}