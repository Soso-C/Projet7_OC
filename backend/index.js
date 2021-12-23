const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv').config()
const path = require('path');

const userRoute = require("./Routes/User");
const postRoute = require("./Routes/Post");


// Ratelimit secure request sur toutes les routes
// up a 500 car les request montre trop vite et parfois (429 to many request)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // maximum 500 connexion en 15 minutes sur toutes les routes
  max: 500
});

app.use(apiLimiter);

// Ratelimit max 14 try email/mdp sur la login route a la 15 eme request bloque l'ip de l'user pendant 15min
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // maximum 15 connexions en 15 minutes sur le login
  max: 15
});

app.use("/api/user/login", loginLimiter)



// Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Packages
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// Routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);


// Multer
app.use('/images', express.static(path.join(__dirname, 'images')));


// Server
app.listen(3001, (req, res) => {
  console.log("Le serveur est en route sur le port : 3001");
});


