const express = require("express");
const router = express.Router()

const db = require("../config/db");

router.get("/register", (req,res) => {
    db.query("INSERT INTO test1 (email, password, fullname) VALUES ('test@test.fr','password','test');",(err,results) => {
      console.log(err)
      res.send(results);
    })
});
  

module.exports = router;