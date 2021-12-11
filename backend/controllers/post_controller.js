const db = require("../config/db");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const jwt = require("jsonwebtoken")


// Créer un post
module.exports.createPost = async (req, res) => {

  let fileName;
  
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 4000000) throw Error("max size");
  } catch (err) {
    return res.status(201).json({ err });
  }

  fileName = req.body.name + Date.now() + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../images/posts/${fileName}`
    )
  );

  try {
    const userId = req.body.userId
    const title = req.body.title
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
    })
  } catch (err) {
    return res.status(500).send({ message: err });
  }

}


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
    const id = req.params.id;
  
    db.query("DELETE FROM posts WHERE id = ?;", 
        [id], 
        (err, result) => {
        if (err) {
            res.status(500).json({ err });
        } else {
          res.status(200).json({ message: "Le post a bien été supprimé !" });
        }
    });
};
  
