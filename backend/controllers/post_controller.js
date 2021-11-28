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
    db.query(
        "SELECT * FROM posts;",
        (err, result) => {
          if (err) {
            res.status(500).json({ err });
          } else {
            res.status(200).json(result);
          }
        }
    );

}