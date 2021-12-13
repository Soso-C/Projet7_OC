const db = require("../config/db");
const jwt = require("jsonwebtoken");


/******************************************************************************** VERIFYUID  ******************************************************************************************/

// Function qui permet de decode le token lors de l'envoie de la request avec authorization en params et on return l'id du token et la var admin qu'on utlisera pour comparer a la db.
// Cette fonction permettra de créer/supprimer/modifier des post/comments etc en comparant les variable qu'on retourne directement d'ou celles ci sont créée depuis notre token donné lors du login.

const verifyUid = (authorization) => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRETTOKEN);
  return {
    id: decodedToken.userId,
    admin: decodedToken.admin,
  };
};


/********************************************************************************** USER CONTROLLER ***********************************************************************************/

// Get tous les users

module.exports.getAllUsers = async (req, res) => {
  db.query(
    "SELECT id, fullname, bio, user_created, picture, github_url FROM users;",
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

// Get 1 user avec son id en params

module.exports.getOneUser = async (req, res) => {
  const uId = req.params.id;
  db.query(
    "SELECT id, fullname, bio, user_created, picture, github_url FROM users WHERE id= ?;",
    [uId],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

// Modify un user

module.exports.modifyUser = async (req, res) => {
  const id = req.params.id;
  const fullname = req.body.fullname;
  const bio = req.body.bio;

  db.query(
    "UPDATE users SET fullname = ?, bio = ?  WHERE id = ?;",
    [fullname, bio, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json({ message: "Fullname et bio changé !" });
      }
    }
  );
};

// Delete un user

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = verifyUid(req.headers.authorization);

  // Si notre tokenid = params id ou que notre tokenid est admin alors on peut faire la request.
  if (user.id === id || user.admin === 1) {
 
    db.query("DELETE FROM users WHERE id = ?;", [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: "ID non trouvé" });
      } else {
        res.status(200).json({ message: "L'user a bien été supprimé !" });
      }
    });
  };
}
