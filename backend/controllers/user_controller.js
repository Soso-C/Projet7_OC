const db = require("../config/db");

// Get la list de Users
module.exports.getAllUsers = async (req, res) => {
  db.query("SELECT id, email, fullname FROM test1;", (err, result) => {
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
    "SELECT id, email, fullname FROM test1 WHERE id= ?;",
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
  const fullname = req.body.fullname

  db.query(
    "UPDATE test1 SET fullname = ?  WHERE id = ?;",
    [fullname, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "ID non trouvé" });
      } else {
        res.status(200).json({ message: "Fullname changé !" });
      }
    }
  );
}
