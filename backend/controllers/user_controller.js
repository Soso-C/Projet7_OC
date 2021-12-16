const db = require("../config/db");
const jwt = require("jsonwebtoken");

/***********************************************************************************  VERIFYUID  ***************************************************************************************/

// Function qui permet de decode le token lors de l'envoie de la request avec authorization en params et on return l'id du token et la var admin qu'on utlisera pour comparer a la db.
// Cette fonction permettra de créer/supprimer/modifier des post/comments etc en comparant les variable qu'on retourne directement depuis notre token donné lors du login.

const verifyUid = (authorization) => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRETTOKEN);
  return {
    id: decodedToken.userId,
    admin: decodedToken.admin,
  };
};

/*********************************************************************************  USER CONTROLLER  **********************************************************************************/

// Get tous les users

module.exports.getAllUsers = async (req, res) => {
  db.query(
    "SELECT id, fullname, bio, user_created, picture, age, metier, country, github_url FROM users;",
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
    "SELECT id, fullname, bio, user_created, picture, age, metier, country, github_url FROM users WHERE id= ?;",
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
  const user = verifyUid(req.headers.authorization);

  const { fullname, bio, country, metier, github, age } = req.body;

  // si notre params id == a notre tokenid ou si notre token est admin alors on peut faire la request.
  if (user.id == id) {
    db.query(
      "UPDATE users SET fullname = ?, bio = ?, country = ?, metier = ?, age = ?, github_url = ? WHERE id = ?;",
      [fullname, bio, country, metier, age, github, id],
      (err, result) => {
        if (err) {
          res.status(500).json({ err });
        } else {
          res.status(200).json({ message: "Le profil a bien été modifié !" });
        }
      }
    );
  }
};

// Delete un user

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = verifyUid(req.headers.authorization);

  // Si notre tokenid = params id ou que notre tokenid est admin alors on peut faire la request pour supprimer l'utilisateur.
  if (user.id == id || user.admin === 1) {
    //Step 1 on supprime tous les commentaires lié a l'id de l'user

    db.query(
      "DELETE FROM comments WHERE user_id = ?",
      [user.id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "ID non trouvé" });
        } else {
          console.log("test1");
          return res.status(200).json({
            message: "Les commentaires de l'user ont bien été supprimé !",
          });
        }
      }
    );

    //Step 2 on delete tous les post lié a l'id de l'user

    db.query("DELETE FROM posts WHERE user_id= ?", [user.id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "ID non trouvé" });
      } else {
        console.log("test2");
        res
          .status(200)
          .json({ message: "Les posts de  l'users ont bien été supprimé !" });
      }
    });

    // Last Step on delete enfin l'user
    db.query("DELETE FROM users WHERE id = ?;", [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Pas authorisé" });
      } else {
        res.status(200).json({ message: "L'user a bien été supprimé !" });
        res.redirect("/sign-up");
      }
    });
  } else {
    return res.status(401).json({ message: "Non Autorisé !" });
  }
};

/********************************************************************************* User Profile ***************************************************************************************/

// Show profil (pour le moment les profils sont personnels  donc on sécure commme cela pour pas que des personnes puissent avoir acces aux infos des autres personnes)

module.exports.getUserProfile = async (req, res) => {
  const id = req.params.id;

  const user = verifyUid(req.headers.authorization);

  // Si notre tokenid est = id alors on montre les infos du profil si non non.
  if (user.id == id) {
    db.query(
      "SELECT id, fullname, bio, user_created, picture, age, metier, country, github_url FROM users WHERE id= ?;",
      [id],
      (err, result) => {
        if (err) {
          res.status(500).json({ err });
        } else {
          res.status(200).json(result);
        }
      }
    );
  } else {
    res.status(500).json({ message: "Non authorisé" });
  }
};
