const db = require("../config/db");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const jwt = require("jsonwebtoken");

/******************************************************************************** VERIFYUID  ******************************************************************************************/

// Function qui permet de decode le token lors de l'envoie de la request avec authorization en params et on return l'id du token et la var admin qu'on utlisera pour comparer a la db.
// Cette fonction permettra de créer/supprimer/modifier des post/comments etc en comparant les variable qu'on retourne directement depuis notre token donné lors du login.

const verifyUid = (authorization) => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRETTOKEN);
  return {
    id: decodedToken.userId,
    admin: decodedToken.admin,
    username: decodedToken.username,
  };
};

/*************************************************************************************** Post ******************************************************************************************/

// Créer un post
module.exports.createPost = async (req, res) => {
  let fileName;
  const user = verifyUid(req.headers.authorization);

  /*************************************************************************** Start Error Input Controller ****************************************************************************/

  // si le title > 50 alors on return une error
  if (req.body.title.length > 70) {
    return res
      .status(500)
      .json({ error: "Le post doit faire moins 50 caracteres" });
  }
  // si le file est vide alors on return une error.
  if (req.file === null) {
    return res.status(500).json({ error: "Le post doit contenir une image" });
  }
  /****************************************************************************** Fin Error Input Controller **************************************************************************/

  // si notre title n'est pas vide ou fais pas plus de 100 alors on fait ca, cela permet de secure et pas stock des img dans le back si la condition n'est pas true.
  else {
    try {
      // Si notre file du front est pas en jpg/png/jpeg alors on return une erreur
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg" &&
        req.file.detectedMimeType != "image/gif"
      )
        throw Error("invalid file");

      // si sa taille dépasse les 4M+ alors on return une erreur
      if (req.file.size > 4000000) throw Error("max size");
    } catch (err) {
      return res.status(201).json({ err });
    }
    // une variable qui aura comme param le name(qui sera l'id user) et la date actuelle pour donné un nom a notre image enregistrer dans le back.
    fileName = req.body.name + Date.now() + ".jpg";

    // créer notre fichier a tel destination
    await pipeline(
      req.file.stream,
      fs.createWriteStream(`${__dirname}/../images/posts/${fileName}`)
    );
    // sinon on try la request
    try {
      const title = req.body.title;
      const img = req.file !== null ? "./images/posts/" + fileName : "";

      // On récupere le pseudo de l'user en relation a l'id de l'user pour pouvoir ensuite l'utiliser son fullname pour le post de la request
      db.query(
        "SELECT fullname FROM users where id = ?",
        [user.id],
        (err, results) => {
          if (!err) {
            // on fait la request pour créer le post
            db.query(
              "INSERT INTO posts (title, img_url, user_id, author_name) VALUES (?, ?, ?, ?);",
              [title, img, user.id, results[0].fullname],
              (err, results) => {
                if (!err) {
                  res.status(201).json({ message: "Post créé avec succes !" });
                } else {
                  res.status(500).json({ err });
                }
              }
            );
          } else {
            results = {
              ...results,
              comments: {
                error: "ID non trouvé",
              },
            };
          }
        }
      );
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
};

// Get tous les posts en fonction de la date de publication.
module.exports.getAllPosts = async (req, res) => {
  db.query("SELECT * FROM posts ORDER BY post_date DESC;", (err, result) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(result);
    }
  });
};

// Get 1 post avec son id en params
module.exports.getOnePost = async (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM posts WHERE id= ?;", [id], (err, result) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(result);
    }
  });
};

// Modify un post
module.exports.modifyPost = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const img = req.body.img;

  db.query(
    "UPDATE posts SET title = ?, img_url = ?  WHERE id = ?;",
    [title, img, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json({ message: "Modification effectuée ! !" });
      }
    }
  );
};

// Delete un post
module.exports.deletePost = async (req, res) => {
  const user = verifyUid(req.headers.authorization);
  const id = req.params.id;

  // Step1 on cherche img_url de post_id pour pouvoir recupérer son path pour la delete avec fs.unlink lors de la delete Request et on récup également l'uId pour controler
  db.query(
    "SELECT img_url, user_id FROM posts WHERE id = ?;",
    [id],
    (err, imgPost) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        // si ya une réponse alors on vérifie notre user si il est admin ou il est owner de l'id
        if (user.admin === 1 || user.id === imgPost[0].user_id) {
          // si note token.id est admin alors on execute cette request

          if (user.admin === 1) {
            //Step 2  on delete tous les commentaires lié au post

            db.query(
              "DELETE FROM comments WHERE post_id = ?",
              [id],
              (err, result) => {
                if (err) {
                  // on return des object perso qui était des res.status(200) avant mais cela faisais une  HTTP headers Error donc il faut retourné ca pour pas crash car c'est limité a un seul res.status(200) par function si j'ai bien compris.
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
                      message:
                        "Les commentaires de l'user ont bien été supprimé !",
                    },
                  };
                }
              }
            );

            // Step3 on delete le post

            db.query("DELETE FROM posts WHERE id = ?;", [id], (err, result) => {
              if (err) {
                result = {
                  ...result,
                  post: {
                    error: "ID non trouvé",
                  },
                };
              } else {
                res.status(200).json({ result });
                // On passe l'url de l'img récupérer lors du SELECT qu'on met comme path pour delete l'img de notre back
                fs.unlink(`${imgPost[0].img_url}`, (err) => {
                  console.log(err);
                });
              }
            });
          } else {
            // si tokenid = user_post id on fait cette request.
            //Step2 on delete tous les commentaires lié au post
            db.query(
              "DELETE FROM comments WHERE post_id = ?",
              [id, user.id],
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
                      message: "Commentaires supprimé By User",
                    },
                  };
                }
              }
            );

            // Step3 on delete le post

            db.query(
              "DELETE FROM posts WHERE id = ? AND user_id = ?",
              [id, user.id],
              (err, result) => {
                if (err) {
                  result = {
                    ...result,
                    post: {
                      error: "ID non trouvé",
                    },
                  };
                } else {
                  // On passe l'url de l'img récupérée lors du SELECT qu'on met comme path pour delete l'img de notre back
                  fs.unlink(`${imgPost[0].img_url}`, (err) => {
                    console.log(err);
                  });
                  res
                    .status(200)
                    .json({ message: "Le post a bien été supprimé by User !" });
                }
              }
            );
          }
        } else {
          // si user != tokenid ou admin alors return Non authorisé
          res.status(500).json({ error: "Non Authorisé !" });
        }
      }
    }
  );
};

/**************************************************************************************** Comments Post  *************************************************************************/

// Créé un commentaire

exports.createComment = (req, res) => {
  const user = verifyUid(req.headers.authorization);
  const { pId, comment } = req.body;

  /*************************************************************************** Start Error Controller ****************************************************************************/
  if (req.body.comment === null || req.body.comment.length < 2) {
    return res
      .status(500)
      .json({ error: "Le commentaire doit faire 2 caracteres minimum" });
  }
  if (req.body.comment.length > 50) {
    return res
      .status(500)
      .json({ error: "Le commentaire doit faire moins de 50 caracteres" });
  } 
  /*************************************************************************** End Error Controller ****************************************************************************/
  else {

    // On récupere le pseudo de l'user en relation du uid du token pour pouvoir ensuite utiliser son fullname pour le commentaire.
    db.query(
      "SELECT fullname FROM users where id = ?",
      [user.id],
      (err, results) => {
        if (!err) {

          // si ok alors on créé le commentaire.
          db.query(
            "INSERT INTO comments (post_id, user_id, comments, author_name) VALUES (?, ?, ?, ?)",
            [pId, user.id, comment, results[0].fullname],
            (err, result) => {
              if (err) {
                res.status(500).json({ err });
                console.log(err);
              }
              res.status(200).json(result);
            }
          );

        } else {
          results = {
            ...results,
            comments: {
              error: "UserID non trouvé",
            },
          };
          res.status(500).json({ err });
        }
      }
    );
  }
};

// Get all comments d'un post

exports.getAllComments = async (req, res) => {
  const pId = req.params.id;

  db.query(
    "SELECT * FROM comments WHERE post_id = ?;",
    [pId],
    (err, comment) => {
      if (err) {
        res.status(500).json({ err });
        console.log(err);
        throw err;
      } else {
        res.status(200).json(comment);
      }
    }
  );
};

// Get 1 comment
exports.getOneComment = (req, res) => {
  const cId = req.params.id;

  db.query("SELECT * FROM comments WHERE id= ?;", [cId], (err, comment) => {
    if (err) {
      res.status(500).json({ err });
      console.log(err);
      throw err;
    } else {
      res.status(200).json(comment);
    }
  });
};

// Delete un comment
exports.deleteOneComment = (req, res) => {
  const cId = req.params.id;
  const user = verifyUid(req.headers.authorization);

  // Si notre token.admin = 1 alors on delete depuis l'id donné en parametre.
  if (user.admin == 1) {
    db.query("DELETE FROM comments WHERE id= ?;", [cId], (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res
          .status(200)
          .json({ message: "Le commentaire a bien été supprimé by Admin !" });
      }
    });
    // Si non on prend l'id du commentaire en params et l'user id du token.
  } else {
    db.query(
      "DELETE FROM comments WHERE id = ? AND user_id = ?",
      [cId, user.id],
      (err, result) => {
        if (err) {
          res.status(500).json({ err });
        } else {
          res
            .status(200)
            .json({ message: "Le commentaire a bien été supprimé by User !" });
        }
      }
    );
  }
};

// Count les comments d'un post

exports.countAllComments = async (req, res) => {
  const pId = req.params.id;

  db.query(
    "SELECT COUNT(*) FROM comments WHERE post_id = ?",
    [pId],
    (err, count) => {
      if (err) {
        res.status(500).json({ err });
        console.log(err);
      } else {
        res.status(200).json(count);
      }
    }
  );
};
