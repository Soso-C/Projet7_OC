const db = require("../config/db");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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
    "SELECT id, nom, prenom, bio, user_created, age, metier, country, github_url FROM users;",
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
    "SELECT id, nom, prenom, bio, user_created, age, metier, country, github_url FROM users WHERE id= ?;",
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

  const { name, lastname, bio, country, metier, github, age } = req.body;

  // si notre params id == a notre tokenid alors on peut faire la request.
  if (user.id == id) {
    db.query(
      "UPDATE users SET nom = ?, prenom = ?, bio = ?, country = ?, metier = ?, age = ?, github_url = ? WHERE id = ?;",
      [lastname, name, bio, country, metier, age, github, id],
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

  // Si notre tokenid = params id alors on peut faire la request pour supprimer l'utilisateur.
  if (user.id == id) {
    //Step 1 on supprime tous les commentaires lié a l'id de l'user
    db.query(
      "DELETE FROM comments WHERE user_id = ?",
      [user.id],
      (err, result) => {
        if (err) {
          result = {
            ...result,
            comments: {
              error: "ID non trouvé",
            },
          };
        } else {
          result = {
            ...result,
            comments: {
              message: "Tous les commentaires son supprimée",
            },
          };
        }
      }
    );

    // Step 2 on recupere les url des images dans un array et supprimes toutes les images de notre back

    db.query(
      "SELECT img_url FROM posts WHERE user_id = ?;",
      [id],
      (err, imgPost) => {
        if (err) {
          imgPost = {
            ...imgPost,
            img: {
              error: "ID non trouvé",
            },
          };
        } else {
          // Recupere nos tableau d'objet img url + string.
          const arrayImg = imgPost;

          // sera notre futur array qui contiendra les url img.
          const testArray = [];

          // on parcour notre array et on recupere seulement les strings (img_url) qu'on push dans notre array vide qui sera un tableau de string de img url
          arrayImg.forEach(function (item, index) {
            console.log(item.img_url, index);
            testArray.push(item.img_url);
          });

          imgPost = {
            ...imgPost,
            img: {
              message: "Img trouvée",
            },
          };
          
          // on itere sur notre array de string (img_url) qui est donc le path pour delete nos img et on les delete une par une avec fs.unlink
          testArray.map((img) =>
            fs.unlink(img, (err) => {
              if (err) throw err;
            })
          );
        }
      }
    );

    // Step 3 on delete tous les post lié a l'id de l'user

    db.query("DELETE FROM posts WHERE user_id= ?", [user.id], (err, result) => {
      if (err) {
        result = {
          ...result,
          posts: {
            error: "ID non trouvé",
          },
        };
      } else {
        result = {
          ...result,
          posts: {
            message: "Tous les commentaires ont étaient supprimé",
          },
        };
      }
    });

    // Last Step on delete enfin l'user

    db.query("DELETE FROM users WHERE id = ?;", [id], (err, result) => {
      if (err) {
        result = {
          ...result,
          comments: {
            error: "ID non trouvé",
          },
        };
      } else {
        res.status(200).json({ message: "L'user a bien était supprimée !" });
      }
    });
  } else {
    return res.status(401).json({ message: "Non Autorisé !" });
  }
};

/********************************************************************************* User Profile ***************************************************************************************/

// Show profil (pour le moment les profils sont personnels donc on sécure commme cela pour pas que des personnes puissent avoir acces aux infos des autres personnes)

module.exports.getUserProfile = async (req, res) => {
  const id = req.params.id;

  const user = verifyUid(req.headers.authorization);

  // Si notre tokenid est = id alors on montre les infos du profil si non non.
  if (user.id == id) {
    db.query(
      "SELECT id, nom, prenom, bio, user_created, age, metier, country, github_url FROM users WHERE id= ?;",
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
    res.status(500).json({ message: "Non Authorisé !" });
  }
};