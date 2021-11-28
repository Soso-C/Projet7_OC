const db = require("../config/db");

// Get la list de Users
module.exports.getAllUsers = async (req, res) => {
  db.query("SELECT id, fullname, bio, user_created, picture, bg_picture, github_url FROM users;", (err, result) => {
    // on recupere id/email/fullname de notre db et on laffiche
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(result);
    }
  });   
};

// Get 1 user avec son id en params
module.exports.getOneUser = async (req, res) => {
  const uId = req.params.id;
  db.query(
    "SELECT id, fullname, bio, user_created, picture, bg_picture, github_url FROM users WHERE id= ?;",
    [uId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "ID non trouvée" });
      } else {
        res.status(200).json(result);
      }
    }
  );
};


// Modify user

module.exports.modifyUser = async (req, res) => {
  
  const id = req.params.id;
  const fullname = req.body.fullname;
  const bio = req.body.bio;

  db.query(
    "UPDATE users SET fullname = ?, bio = ?  WHERE id = ?;",
    [fullname, bio, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "ID non trouvé" });
      } else {
        res.status(200).json({ message: "Fullname et bio changé !" });
      }
    }
  );
}


module.exports.deleteUser = async (req, res) => {
  
  const id = req.params.id;

  db.query(
    "DELETE FROM users WHERE id = ?;",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "ID non trouvé" });
      } else {
        res.status(200).json({ message: "L'user a bien été supprimé !" });
      }
    }
  );
}
