const db = require("../config/db");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
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

/******************************************************************************* Post *************************************************************************************************/

// Créer un post
module.exports.createPost = async (req, res) => {
  let fileName;

  // Error
  try {
    // Si notre file du front est pas en jpg/png/jpeg alors on return une erreur
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    // si sa taille dépasse les 4M+ alors on return une erreur
    if (req.file.size > 4000000) throw Error("max size");
  } catch (err) {
    return res.status(201).json({ err });
  }

  // une variable qui aura comme param le name et la date actuelle pour donné un nom a notre fichier
  fileName = req.body.name + Date.now() + ".jpg";

  // créer notre fichier a tel destination
  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/posts/${fileName}`)
  );

  // si notre title  n'a rien ou n'a pas min 1 caract alors on return une erreur
  if (req.body.title === null || req.body.title.length < 1) {
    return res
      .status(500)
      .json({ error: "Le post doit faire au moins 1 caractere" });
  } else { // sinon on fait la request
    try {
      const userId = req.body.userId;
      const title = req.body.title;
      const img = req.file !== null ? "./images/posts/" + fileName : "";

      db.query(
        "INSERT INTO posts (title, img_url, user_id) VALUES (?, ?, ?);",
        [title, img, userId],
        (err, results) => {
          if (!err) {
            res.status(201).json({ message: "Post créé avec succes !" });
          } else {
            res.status(500).json({ err });
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

  if (user.admin === 1) {
    db.query("DELETE FROM posts WHERE id = ?;", [id], (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res
          .status(200)
          .json({ message: "Le post a bien été supprimé by Admin !" });
      }
    });
  } else {
    db.query(
      "DELETE FROM posts WHERE id = ? AND user_id = ?",
      [id, user.id],
      (err, result) => {
        if (err) {
          res.status(500).json({ err });
        } else {
          res
            .status(200)
            .json({ message: "Le post a bien été supprimé by User !" });
        }
      }
    );
  }
};

/**************************************************************************************** Comments Post  *******************************************************************/

// Créé un commentaire

exports.createComment = (req, res) => {
  const { pId, uId, comment } = req.body;

  if (req.body.comment === null || req.body.comment.length < 2) {
    return res
      .status(500)
      .json({ error: "Le commentaire doit faire au moins 2 caracteres" });
  } else {
    db.query(
      "INSERT INTO comments (post_id, user_id, comments) VALUES (?, ?, ?)",
      [pId, uId, comment],
      (err, result) => {
        if (err) {
          res.status(500).json({ err });
          console.log(err);
          throw err;
        }
        res.status(200).json(result);
      }
    );
  }
};

// Get all comments d'un post

exports.getAllComments = (req, res) => {
  const pId = req.param.id;

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
  const cId = req.param.id;

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

  const cId = req.param.id;
  const user = verifyUid(req.headers.authorization);


  // Si notre token.admin = 1 alors on delete depuis l'id donné en parametre.
  if (user.admin === 1) {
    db.query("DELETE FROM comments WHERE id= ?;", [cId], (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res
          .status(200)
          .json({ message: "Le commentaire a bien été supprimé by Admin !" });
      }
    });
    // Si non on prend l'id du commentaire en params et l'user id du token et non pas l'id en req.body
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
