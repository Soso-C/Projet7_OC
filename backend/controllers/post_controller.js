const db = require("../config/db");


// Créer un post
module.exports.createPost = async (req, res) => {
  const title = req.body.title;
  const img = req.body.img;

  db.query(
    "INSERT INTO posts (title, img_url) VALUES (?, ?);",
    [title, img],
    (err, results) => {
      if (!err) {
        res.status(201).json({ message: "Post créé avec succes !" });
      } else {
        res.status(500).json({ err });
      }
    }
  );
};


// Get tous les posts.
module.exports.getAllPosts = async (req, res) => {
  db.query("SELECT * FROM posts;", (err, result) => {
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
  