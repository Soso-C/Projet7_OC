const express = require("express");
const app = express();
const cors = require("cors")
const bodyparser = require("body-parser")

app.use(cors());
app.use(bodyparser.json());

const userRoute = require("./Routes/User");
app.use("/user", userRoute);


app.listen(3001, (req,res) =>{
    console.log("Le serveur est en route sur le port : 3001")
})  