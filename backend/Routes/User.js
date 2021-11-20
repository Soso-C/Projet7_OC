const express = require("express");
const router = express.Router()

const db = require("../config/db");

router.post("/register", (req,res) => {

    const fullname = req.body.fullname;
    const password = req.body.password;
    const email = req.body.email;

    db.query("INSERT INTO test1 (email, password, fullname) VALUES (?, ?, ?);",
        [email, password, fullname],
            (err,results) => {
                console.log(err)
                res.send(results);
            })
});
  

module.exports = router;