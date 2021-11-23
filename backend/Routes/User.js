const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const db = require("../config/db");

// Post pour créer user
router.post("/signup", (req,res) => {

    const fullname = req.body.fullname;
    const password = req.body.password;
    const email = req.body.email;

    // On récupere le pwd de l'user on le salt x10 / hash avec bcrypt on attend que tout soit fait et on envoie tout ca a la db.
    bcrypt.hash(password, 10)
      .then(hash => { 

          db.query("INSERT INTO test1 (email, password, fullname) VALUES (?, ?, ?);",
            [email, hash, fullname],
            (err,results) => {
                console.log(err)
                res.send(results);
            })
        });
});


// Post login user.
router.post("/login", (req,res) => {

    

})
  

module.exports = router;
